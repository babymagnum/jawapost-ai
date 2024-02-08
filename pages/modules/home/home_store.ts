import { create } from "zustand"

interface State {
    index: number
}

interface Actions {
    setIndex: (data: number) => void
}

const initialState: State = {
    index: 0,
}

export const useHomeStore = create<State & Actions>()((set) => {
    return ({
        ...initialState,
        setIndex: (data) => set(({index: data}))
    })
})