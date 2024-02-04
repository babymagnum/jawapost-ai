import { create } from "zustand";
import { RequestState } from "../../interface/request_state";

interface State {
    inputItem: string[]
    generateState: RequestState
}

interface Actions {
    addInput: (data: string) => void
    deleteInput: (index: number) => void
    updateInput: (index: number, data: string) => void
    generateArticle: () => void
}

const initialState: State = {
    inputItem: [''],
    generateState: RequestState.IDLE
}

export const useDemo3Store = create<State & Actions>()((set) => ({
    ...initialState,
    addInput: (data) => set((state) => ({ inputItem: [...state.inputItem, data] })),
    deleteInput: (index) => set((state) => ({ inputItem: state.inputItem.filter((_, _index) => _index !== index) })),
    updateInput: (index, data) => set((state) => ({
        inputItem: state.inputItem.map((_element, _index) => {
            if (_index === index) {
                return data
            }

            return _element
        })
    })),
    generateArticle: () => generateArticle()
}))

function generateArticle() {
    
}