import { memo, useEffect, useRef } from "react"
import { useDemo4Store } from "./demo4_store"
import { Colors } from "../../helpers/const_strings"
import { RequestState } from "../../interface/request_state"
import { SearchItem } from "./components/search_item"

const Demo4 = () => {
    const article = useDemo4Store(state => state.article)
    const buttonContent = useDemo4Store(state => state.buttonContent)
    const result = useDemo4Store(state => state.result)
    const searchArticle = useDemo4Store(state => state.searchArticle)
    const articleState = useDemo4Store(state => state.articleState)
    const articleError = useDemo4Store(state => state.articleError)
    const setArticle = useDemo4Store(state => state.setArticle)
    const setArticleError = useDemo4Store(state => state.setArticleError)
    const setScrollPosition = useDemo4Store(state => state.setScrollPosition)
    const scrollPosition = useDemo4Store(state => state.scrollPosition)
    const loadingButtonContent = useDemo4Store(state => state.loadingButtonContent)
    const divRef = useRef<HTMLDivElement>()
    
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = scrollPosition
        }
    }, [])

    return (
        <div ref={divRef} onScroll={(event) => {
            setScrollPosition(event.currentTarget.scrollTop)
        }} style={{ flex: 1, flexDirection: 'column', overflowY: 'auto', paddingInline: '10vw', display: 'flex', overflowX: 'hidden' }}>
            <h1 style={{ marginBottom: 10 }}>Search Article</h1>
            <textarea
                value={article}
                onChange={(event) => {
                    setArticle(event.target.value);
                    setArticleError(event.target.value === '' ? 'Article tidak boleh kosong!' : '')
                }}
                style={{ backgroundColor: Colors.disableLight, minHeight: 250, resize: 'none', border: 0, outline: 0, padding: 10, }}
                placeholder="Masukkan article..."
            />
            {
                articleState === RequestState.ERROR &&
                <span style={{ whiteSpace: 'pre-wrap', marginTop: 4, }}>{articleError}</span>
            }
            <div style={{ flexDirection: 'row', marginBlock: 10 }}>
                <button disabled={article === '' || articleState === RequestState.LOADING} onClick={() => {
                    searchArticle()
                    loadingButtonContent()
                }} style={{ paddingInline: 16, paddingBlock: 4, backgroundColor: article === '' || articleState === RequestState.LOADING ? Colors.disableBold : Colors.success, border: 0, outline: 0, borderRadius: 6, color: Colors.white }}>
                    {
                        buttonContent
                    }
                </button>
            </div>
            {
                articleState === RequestState.SUCCESS &&
                (result?.data ?? []).filter(element => element.similarDocumentsCount > 0).map((element, index) => <SearchItem data={element} index={index} isLast={index === (result?.data ?? []).filter(element => element.similarDocumentsCount > 0).length - 1} />)
            }
        </div>
    )
}

export default memo(Demo4)