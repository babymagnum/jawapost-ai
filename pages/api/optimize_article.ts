import { NextApiRequest, NextApiResponse } from "next";
import { StandartModel } from "./model/standart_model";
import { chatModel } from "../helpers/openai_instance";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { optimizeArticlePrompts } from "./prompts/optimize_article_prompts";

export default async function handler(request: NextApiRequest, response: NextApiResponse<StandartModel>) {
    const article: string = request.body.article ?? []

    try {    
        const result = await chatModel(0.3, 0.8).call([
            new SystemMessage(optimizeArticlePrompts),
            new HumanMessage(`
            ==== Artikel / Berita ====
            
            ${article}

            ==== Artikel / Berita ===
            `),
        ]);

        response.status(200).json({
            message: 'Success',
            content: result.content
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