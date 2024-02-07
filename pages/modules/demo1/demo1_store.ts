import { create } from 'zustand'
import { RequestState } from '../../interface/request_state'
import { Demo1Result } from './model/demo1_result'
import { ChatsModel } from './model/chats_model'

type State = {
    url: string
    errorUrl: string
    urlState: RequestState
    result?: string
    chatBoxVisible: boolean
    query: string
    chats: ChatsModel[]
    askOpenAIState: RequestState
    scrollPosition: number
}

type Actions = {
    setResult: (data: string) => void
    setUrl: (data: string) => void
    setErrorUrl: (data: string) => void
    setUrlState: (data: RequestState) => void
    setChatBoxVisible: (data: boolean) => void
    setQuery: (data: string) => void
    addChats: (data: ChatsModel) => void
    clearChats: () => void
    setAskOpenAIState: (data: RequestState) => void
    setScrollPosition: (data: number) => void
}

export const useDemo1Store = create<State & Actions>()((set, get) => ({
    url: '',
    errorUrl: '',
    urlState: RequestState.IDLE,
    chatBoxVisible: false,
    query: '',
    chats: [],
    askOpenAIState: RequestState.IDLE,
    scrollPosition: 0,
    setUrl: (data) => set(({ url: data })),
    setErrorUrl: (data) => set(({ errorUrl: data })),
    setUrlState: (data) => set(({ urlState: data })),
    setResult: (data) => set(({ result: data })),
    setChatBoxVisible: (data) => set(({ chatBoxVisible: data })),
    setQuery: (data) => set(({ query: data })),
    addChats: (data) => set(state => ({ chats: [...state.chats, data] })),
    setAskOpenAIState: (data) => set(({ askOpenAIState: data })),
    setScrollPosition: (data) => set(({ scrollPosition: data })),
    clearChats: () => set(({chats: []}))
}))
