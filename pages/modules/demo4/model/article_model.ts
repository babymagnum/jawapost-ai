import { DocumentInterface } from "@langchain/core/documents";

export default interface ArticleModel {
    content: string
    chunkWithSimilarDocuments?: ArticleChunkItem[]
    similarDocumentsCount?: number
    // // this is contains article target similar content
    // similarDocuments?: DocumentInterface[]
    // // this is contains article origin similar content
    // similarOriginDocuments?: DocumentInterface[]
}

export interface ArticleChunkItem {
    chunk: string
    similarDocuments: DocumentInterface[]
}