import { NextApiRequest, NextApiResponse } from "next";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { ExtractArticleModel } from "./model/extract_article_model";
import { chatModel, embeddings } from "../helpers/openai_instance";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { extractDataPrompts } from "./prompts/extract_article_prompts";

export default async function handler(request: NextApiRequest, response: NextApiResponse<ExtractArticleModel>) {
    const url = request.body.url || '';

    try {
        processUrl(url, response)
    } catch (error) {
        console.log(error)

        if (error.response) {
            setResponseError(error.response.status, error.response.data, response)
        } else {
            setResponseError(500, "An error occurred during your request.", response)
        }
    }
}

async function processUrl(url: string, response: NextApiResponse<ExtractArticleModel>) {
    const title = url.split('/').pop()
    console.log(`title ==> ${title}`)

    const loader = new CheerioWebBaseLoader(url);

    const docs = await loader.load();

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
        chunkOverlap: 600 / 5, chunkSize: 600
    });

    const sequence = splitter.pipe(new HtmlToTextTransformer());

    const newDocuments = await sequence.invoke(docs);

    const vectorStore = await HNSWLib.fromDocuments(
        newDocuments, embeddings
    )

    const filteredDocuments = await vectorStore.similaritySearch(title)

    filteredDocuments.forEach((element, index) => {
        console.log(`filteredDocuments ${index} ==> ${element.pageContent}`)
    });

    const filteredVectorStore = await HNSWLib.fromDocuments(
        filteredDocuments, embeddings
    )

    await filteredVectorStore.save("././url-sources/temp-berita");

    askToOpenAI(filteredDocuments.map(element => element.pageContent).toString(), response)
}

async function askToOpenAI(data: string, response: NextApiResponse<ExtractArticleModel>) {
    const result = await chatModel(0.3, 0.8).call([
        new SystemMessage(extractDataPrompts),
        new HumanMessage(data),
    ]);

    response.status(200).json({
        message: 'Success',
        content: result.content.toString()
    })
}

function setResponseError(statusCode: number, message: string, response: NextApiResponse<ExtractArticleModel>) {
    response.status(statusCode).json({
        message: message,
    })
}