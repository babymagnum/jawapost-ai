import { NextApiRequest, NextApiResponse } from "next";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
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

    console.time('loadCherrio')
    const docs = await loader.load();
    console.timeEnd('loadCherrio')

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

    const sequence = splitter.pipe(new HtmlToTextTransformer());

    console.time('sequenceDocs')
    const newDocuments = await sequence.invoke(docs);
    console.timeEnd('sequenceDocs')

    console.time('registerVectorStore')
    const vectorStore = await HNSWLib.fromDocuments(
        newDocuments, embeddings
    )
    console.timeEnd('registerVectorStore')

    console.time('similaritySearch')
    const filteredDocuments = await vectorStore.similaritySearch(title)
    console.timeEnd('similaritySearch')

    filteredDocuments.forEach(element => {
        console.log(`filteredDocuments ==> ${element.pageContent}`)
    });

    const filteredVectorStore = await HNSWLib.fromDocuments(
        filteredDocuments, embeddings
    )

    console.time('saveFilteredVectorStore')
    await filteredVectorStore.save("././url-sources/temp-berita");
    console.timeEnd('saveFilteredVectorStore')

    askToOpenAI(filteredDocuments.map(element => element.pageContent).toString(), response)
}

async function askToOpenAI(data: string, response: NextApiResponse<ExtractArticleModel>) {
    console.time('askToOpenAI')
    const result = await chatModel(0.3, 0.8).invoke([
        new SystemMessage(extractDataPrompts),
        new HumanMessage(data),
    ]);
    console.timeEnd('askToOpenAI')

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