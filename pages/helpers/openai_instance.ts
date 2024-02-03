import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export function chatModel(temperature?: number, top_p?: number): ChatOpenAI {
    return new ChatOpenAI({
        temperature: temperature || 0.15,
        topP: top_p || 0.85,
        maxTokens: -1,
        verbose: true,
        azureOpenAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        azureOpenAIApiVersion: process.env.NEXT_PUBLIC_OPENAI_API_VERSION,
        azureOpenAIApiDeploymentName: process.env.NEXT_PUBLIC_OPENAI_API_NAME,
        azureOpenAIBasePath: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
    })
}

export const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.NEXT_PUBLIC_OPENAI_API_VERSION,
    azureOpenAIApiDeploymentName: process.env.NEXT_PUBLIC_OPENAI_API_EMBEDDING_NAME,
    azureOpenAIBasePath: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
});