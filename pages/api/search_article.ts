import { NextApiRequest, NextApiResponse } from "next";
import { embeddings } from "../helpers/openai_instance";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import ArticleModel from "../modules/demo4/model/article_model";
import { article1, article2, article3, article4, article5, article6 } from "../../mock_article/articles";
import { SearchArticleModel } from "./model/search_query_model";
import { DocumentInterface } from "@langchain/core/documents";
import { object } from "zod";

export default async function handler(request: NextApiRequest, response: NextApiResponse<SearchArticleModel>) {
    const article: string = request.body.article ?? ''

    try {
        const articleSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400, chunkOverlap: 40
        });

        // const articleComparisonSplitter = new CharacterTextSplitter({
        //     separator: '\n\n'
        // });

        const articleComparisonSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400, chunkOverlap: 40
        });

        console.time('createDocumentsOrigin ==>');
        const output = await articleSplitter.createDocuments([article]);
        console.timeEnd('createDocumentsOrigin ==>')

        output.forEach(element => {
            console.log(`output ==> ${element.pageContent}`)
        });

        console.time('assignVectorStore');
        const vectorStore = await HNSWLib.fromDocuments(output, embeddings)
        console.timeEnd('assignVectorStore');
        
        const articleList: ArticleModel[] = [
            {
                content: article1, similarityDocumentsCount: 0
            },
            {
                content: article2, similarityDocumentsCount: 0
            },
            {
                content: article3, similarityDocumentsCount: 0
            },
            {
                content: article4, similarityDocumentsCount: 0
            },
            {
                content: article5, similarityDocumentsCount: 0
            },
            {
                content: article6, similarityDocumentsCount: 0
            },
        ]

        for (const { index, value } of articleList.map((value, index) => ({ index, value }))) {
            console.time(`createDocuments ${index}`)
            const articleChunks = await articleComparisonSplitter.createDocuments([value.content]);
            console.timeEnd(`createDocuments ${index}`)

            console.log(`articleChunksLength ==> ${articleChunks.length}`)

            let similarContent = 0

            for (const value of articleChunks) {
                console.time('similaritySearch')
                const similarity = await vectorStore.similaritySearchWithScore(value.pageContent, 4)
                console.timeEnd('similaritySearch')
                
                console.log(`\n\narticleChunk ==> ${value.pageContent}\n\n`)
                similarity.forEach(element => {
                    console.log(`similarity ==> ${element[1]}`)
                });

                similarContent += similarity.filter(element => element[1] < 0.1).length
            }

            articleList[index].similarityDocumentsCount = similarContent
        }

        articleList.forEach(element => {
            console.log(`articles ==> ${element.similarityDocumentsCount}`)
        });

        response.status(200).json({
            message: 'Success',
            data: articleList
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

// function checkIsContentSimilar(, chunk: string) {
//     const formattedArticle
// }

function setResponseError(statusCode: number, message: string, response: NextApiResponse<SearchArticleModel>) {
    response.status(statusCode).json({
        message: message,
    })
}