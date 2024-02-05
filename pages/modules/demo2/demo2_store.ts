import { create } from "zustand";
import { RequestState } from "../../interface/request_state";
import { StandartModel } from "../../api/model/standart_model";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface State {
    article: string
    generateState: RequestState
    result?: StandartModel
    scrollPosition: number
    buttonContent: string
}

interface Actions {
    setArticle: (data: string) => void
    setScrollPosition: (data: number) => void
    optimizeArticle: () => void
    loadingButtonContent: () => void
}

const initialState: State = {
    article: '',
    generateState: RequestState.IDLE,
    scrollPosition: 0,
    buttonContent: 'Optimize'
}

export const useDemo2Store = create<State & Actions>()((set, get) => {

    async function optimizeArticle() {
        try {
            set(({ generateState: RequestState.LOADING }));
            const response = await fetch("/api/optimize_article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    article: get().article,
                }),
            });
            set(({ generateState: response.status === 200 ? RequestState.SUCCESS : RequestState.ERROR }));

            const data: StandartModel = await response.json();

            if (response.status !== 200) {
                alert(data.message ?? 'error!');
                return;
            }

            // set the result
            set(({ result: data }))
        } catch (error) {
            console.log(`fetch error: ${error}`)
            // Consider implementing your own error handling logic here
            alert(error.message);
            set(({ generateState: RequestState.ERROR }));
        }
    }

    return ({
        ...initialState,
        setArticle: (data) => set(({ article: data })),
        setScrollPosition: (data) => set(({ scrollPosition: data })),
        optimizeArticle: () => optimizeArticle(),
        loadingButtonContent: async () => {
            let dot = ''

            while (get().generateState === RequestState.LOADING) {
                dot += '.'
                set(({ buttonContent: `Optimize${dot}` }))

                if (dot === '...') dot = ''
                
                await delay(500)                            
            }

            set(({ buttonContent: `Optimize` }))
        }
    })
})