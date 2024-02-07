import { NextApiRequest, NextApiResponse } from "next";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HtmlToTextTransformer } from "langchain/document_transformers/html_to_text";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { ExtractArticleModel } from "./model/extract_article_model";
import { chatModel, embeddings } from "../helpers/openai_instance";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { extractDataPrompts } from "./prompts/extract_article_prompts";
import { Document } from "langchain/document";
import { DocumentInterface } from "@langchain/core/documents";
import { string } from "zod";

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

    const loader = new CheerioWebBaseLoader(url)

    console.time('loadCherrio')
    const docs = await loader.load()
    console.timeEnd('loadCherrio')

    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");

    const sequence = splitter.pipe(new HtmlToTextTransformer())

    console.time('sequenceDocs')
    const newDocuments = await sequence.invoke(docs);
    console.timeEnd('sequenceDocs')

    console.time('registerVectorStore')
    const vectorStore = await HNSWLib.fromDocuments(
        newDocuments, embeddings
    )
    console.timeEnd('registerVectorStore')

    let splittedTitle: string[] = []

    if (title.includes(' ')) {
        splittedTitle = title.split(' ')
    } else if (title.includes('-')) {
        splittedTitle = title.split('-')
    }

    const threshold = Math.round(splittedTitle.length / 2) < 1 ? 1 : Math.round(splittedTitle.length / 2)

    let finalSplittedTitle: string[] = []
    finalSplittedTitle.push(splittedTitle.slice(0, threshold).toString(), splittedTitle.slice(threshold, splittedTitle.length).toString())

    let filteredDocuments: DocumentInterface<Record<string, any>>[] = []

    for (const _charTitle of finalSplittedTitle) {
        console.time(`similaritySearch ${_charTitle.replaceAll(',', ' ')}`)
        const _filtered = await vectorStore.similaritySearch(_charTitle.replaceAll(',', ' '))
        filteredDocuments.push(..._filtered)
        console.timeEnd(`similaritySearch ${_charTitle.replaceAll(',', ' ')}`)
    }

    filteredDocuments.forEach(element => {
        console.log(`filteredDocuments ==> ${element.pageContent}`)
    });

    console.time(`savefilteredDocument`)
    const filteredVectorStore = await HNSWLib.fromDocuments(
        filteredDocuments, embeddings
    )
    console.timeEnd('savefilteredDocument')

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