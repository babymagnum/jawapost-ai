import { NextApiRequest, NextApiResponse } from "next";
import { StandartModel } from "./model/standart_model";
import { chatModel } from "../helpers/openai_instance";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { optimizeArticlePrompts } from "./prompts/optimize_article_prompts";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { createRetrieverTool } from "langchain/tools/retriever";

export default async function handler(request: NextApiRequest, response: NextApiResponse<SearchQueryModel>) {
    const article: string = request.body.article ?? ''

    try {
        
    } catch (error) {
        console.log(error)

        if (error.response) {
            setResponseError(error.response.status, error.response.data, response)
        } else {
            setResponseError(500, "An error occurred during your request.", response)
        }
    }
}

function setResponseError(statusCode: number, message: string, response: NextApiResponse<SearchQueryModel>) {
    response.status(statusCode).json({
        message: message,
    })
}