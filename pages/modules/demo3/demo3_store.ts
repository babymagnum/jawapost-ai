import { create } from "zustand";
import { RequestState } from "../../interface/request_state";
import { StandartModel } from "../../api/model/standart_model";

interface State {
    inputItem: string[]
    generateState: RequestState
    result?: string
    scrollPosition: number
}

interface Actions {
    addInput: (data: string) => void
    deleteInput: (index: number) => void
    updateInput: (index: number, data: string) => void
    generateArticle: () => void
    setScrollPosition: (data: number) => void
}

const initialState: State = {
    inputItem: [''],
    generateState: RequestState.IDLE,
    scrollPosition: 0
}

export const useDemo3Store = create<State & Actions>()((set, get) => {
    async function generateArticle() {
        try {
            set(({generateState: RequestState.LOADING}));
            const response = await fetch("/api/generate_article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    points: get().inputItem,
                }),
            });
            set(({generateState: response.status === 200 ? RequestState.SUCCESS : RequestState.ERROR}));
    
            const data: StandartModel = await response.json();
    
            if (response.status !== 200) {
                alert(data.message ?? 'error!');
                return;
            }
    
            // set the result
            set(({result: data.content ?? ''}))
        } catch (error) {
            console.log(`fetch error: ${error}`)
            // Consider implementing your own error handling logic here
            alert(error.message);
            set(({generateState: RequestState.ERROR}));
        }
    }

    return ({
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
        generateArticle: () => generateArticle(),
        setScrollPosition: (data) => set(({scrollPosition: data}))
    })
})