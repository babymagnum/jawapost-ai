import { NextApiRequest, NextApiResponse } from "next";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { chatModel, embeddings } from "../helpers/openai_instance";
import { HumanMessage, SystemMessage, AIMessage } from "langchain/schema";
import { chatbotArticlePrompts } from "./prompts/chatbot_article_prompts";
import { StandartModel } from "./model/standart_model";
import { existsSync } from 'node:fs';

const articleTempDir = '././url-sources/temp-berita'

export default async function handler(request: NextApiRequest, response: NextApiResponse<StandartModel>) {
    const query = request.body.query ?? '';
    const lastAIMessage = request.body.lastAIMessage ?? '';
    const lastUserMessage = request.body.lastUserMessage ?? '';

    try {
        if (!existsSync(articleTempDir)) {
            setResponseError(500, 'Anda belum mencari article!, silakan cari article terlebih dahulu', response)
            return
        }

        console.time('load method');
        const vectorStore = await HNSWLib.load(
            articleTempDir, embeddings
        );
        console.timeEnd('load method');

        const lastResponseArray: (HumanMessage | AIMessage)[] = []

        if (lastAIMessage !== '' && lastUserMessage !== '') {
            lastResponseArray.push(new HumanMessage(lastUserMessage))
            lastResponseArray.push(new AIMessage(lastAIMessage))
        }

        const documents = await vectorStore.similaritySearch('');
        const data = documents.map(element => element.pageContent).toString()
        const result = await chatModel(0.3, 0.8).call([
            new SystemMessage(chatbotArticlePrompts(data)),
            ...lastResponseArray,
            new HumanMessage(query),
        ]);

        response.status(200).json({
            message: 'Success',
            content: result.content.toString()
        })
    } catch (error) {
        console.log(error)

        if (error.response) {
            setResponseError(error.response.status, error.response.data, response)
        } else {
            setResponseError(500, "An error occurred during your request.", response)
        }
    }
}

function setResponseError(statusCode: number, message: string, response: NextApiResponse<StandartModel>) {
    response.status(statusCode).json({
        message: message,
    })
}