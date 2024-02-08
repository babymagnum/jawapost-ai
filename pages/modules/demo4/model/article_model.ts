import { DocumentInterface } from "@langchain/core/documents";

export default interface ArticleModel {
    id: number
    content: string
    chunkWithSimilarDocuments?: ArticleChunkItem[]
    similarDocumentsCount?: number
}

export interface ArticleChunkItem {
    chunk: string
    similarDocuments: DocumentInterface[]
}