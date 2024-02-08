import { NextApiRequest, NextApiResponse } from "next"
import { embeddings } from "../helpers/openai_instance"
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import ArticleModel, { ArticleChunkItem } from "../modules/demo4/model/article_model"
import { article1, article10, article11, article2, article3, article4, article5, article6, article7, article8, article9 } from "../../mock_article/articles"
import { SearchArticleModel } from "./model/search_query_model"

export default async function handler(request: NextApiRequest, response: NextApiResponse<SearchArticleModel>) {
    const article: string = request.body.article ?? ''

    try {
        const articleSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400, chunkOverlap: 40
        })

        const articleComparisonSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400, chunkOverlap: 40
        })

        console.time('createDocumentsOrigin ==>')
        const output = await articleSplitter.createDocuments([article])
        console.timeEnd('createDocumentsOrigin ==>')

        output.forEach(element => {
            console.log(`output ==> ${element.pageContent}`)
        })

        console.time('assignVectorStore')
        const vectorStore = await HNSWLib.fromDocuments(output, embeddings)
        console.timeEnd('assignVectorStore')

        const articleList: ArticleModel[] = [
            { id: 1, content: article1 },
            { id: 2, content: article2 },
            { id: 3, content: article3 },
            { id: 4, content: article4 },
            { id: 5, content: article5 },
            { id: 6, content: article6 },
            { id: 7, content: article7 },
            { id: 8, content: article8 },
            { id: 9, content: article9 },
            { id: 10, content: article10 },
            { id: 11, content: article11 },
        ]

        for (const { index, value } of articleList.map((value, index) => ({ index, value }))) {
            console.time(`createDocuments ${index}`)
            const articleChunks = await articleComparisonSplitter.createDocuments([value.content])
            console.timeEnd(`createDocuments ${index}`)

            console.log(`articleChunksLength ==> ${articleChunks.length}`)

            let similarDocumentCount = 0
            let articleChunkList: ArticleChunkItem[] = []

            for (const value of articleChunks) {
                console.time('similaritySearch')
                const similarity = await vectorStore.similaritySearchWithScore(value.pageContent, 4)
                console.timeEnd('similaritySearch')

                console.log(`\n\narticleChunk ==> ${value.pageContent}\n\n`)
                similarity.forEach(element => {
                    console.log(`similarity ==> ${element[1]}`)
                })

                const _similarDocument = similarity.filter(element => element[1] < 0.12).map(element => element[0])
                console.log(`_similarDocument ==> ${_similarDocument.length}`)

                if (_similarDocument.length > 0) {
                    similarDocumentCount += _similarDocument.length
                    articleChunkList.push({
                        chunk: value.pageContent,
                        similarDocuments: _similarDocument
                    })
                }
            }

            articleList[index].similarDocumentsCount = similarDocumentCount
            articleList[index].chunkWithSimilarDocuments = articleChunkList
        }

        articleList.forEach(element => {
            (element.chunkWithSimilarDocuments ?? []).forEach(_element => {
                console.log(`\n\norigin chunk article ${_element.chunk}\n\n`)
                _element.similarDocuments.forEach((_targetSimilar, index) => {
                    console.log(`${index + 1}. ${_targetSimilar.pageContent}`)
                })
            })
        })

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

function setResponseError(statusCode: number, message: string, response: NextApiResponse<SearchArticleModel>) {
    response.status(statusCode).json({
        message: message,
    })
}