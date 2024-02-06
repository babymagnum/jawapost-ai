import { create } from "zustand";
import { RequestState } from "../../interface/request_state";
import { StandartModel } from "../../api/model/standart_model";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


interface State {
    article: string
    buttonContent: string
    articleError: string
    articleState: RequestState
    result?: StandartModel
    scrollPosition: number
}

interface Actions {
    setArticle: (data: string) => void
    setArticleError: (data: string) => void
    setScrollPosition: (data: number) => void
    searchArticle: () => void
    loadingButtonContent: () => void
}

const initialState: State = {
    article: '',
    buttonContent: 'Search',
    articleError: '',
    articleState: RequestState.IDLE,
    scrollPosition: 0
}

export const useDemo4Store = create<State & Actions>()((set, get) => {

    async function searcharticle() {
        try {
            set(({ articleState: RequestState.LOADING }));
            const response = await fetch("/api/search_article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    article: get().article,
                }),
            });
            set(({ articleState: response.status === 200 ? RequestState.SUCCESS : RequestState.ERROR }));

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
            set(({ articleState: RequestState.ERROR }));
        }
    }

    return ({
        ...initialState,
        setArticle: (data) => set(({ article: data })),
        setArticleError: (data) => set(({ articleError: data })),
        setScrollPosition: (data) => set(({ scrollPosition: data })),
        searchArticle: () => searcharticle(),
        loadingButtonContent: async () => {
            let dot = ''

            while (get().articleState === RequestState.LOADING) {
                dot += '.'
                set(({ buttonContent: `Optimize${dot}` }))

                if (dot === '...') dot = ''
                
                await delay(500)                            
            }

            set(({ buttonContent: `Optimize` }))
        }
    })
})