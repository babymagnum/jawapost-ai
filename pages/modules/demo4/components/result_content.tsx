import { useDemo4Store } from "../demo4_store"
import { SearchItem } from "./search_item"

export const ResultContent = () => {
    const result = useDemo4Store(state => state.result)

    return (
        <div style={{ flex: 1, overflowY: 'auto', paddingLeft: '5vw', paddingRight: '5vw' }}>
            {/* {(result?.data ?? []).map((element, index) => <SearchItem data={element} isLast={index === (result?.data ?? []).length - 1} />)} */}
        </div>
    )
}