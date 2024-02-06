import { FC, memo } from "react";
import { useDemo2Store } from "./demo2_store";
import { Colors } from "../../helpers/const_strings";
import { RequestState } from "../../interface/request_state";

interface Demo2Props { }

const Demo2: FC<Demo2Props> = () => {
    const article = useDemo2Store(state => state.article)
    const setArticle = useDemo2Store(state => state.setArticle)
    const optimizeArticle = useDemo2Store(state => state.optimizeArticle)
    const buttonContent = useDemo2Store(state => state.buttonContent)
    const loadingButtonContent = useDemo2Store(state => state.loadingButtonContent)
    const generateState = useDemo2Store(state => state.generateState)
    const result = useDemo2Store(state => state.result)

    return (
        <div style={{ flex: 1, flexDirection: 'column', overflowY: 'auto', paddingInline: '10vw', display: 'flex', overflowX: 'hidden' }}>
            <h1 style={{ marginBottom: 10 }}>Optimize Article</h1>
            <textarea
                value={article}
                onChange={(event) => setArticle(event.target.value)}
                style={{ backgroundColor: Colors.disableLight, minHeight: 250, resize: 'none', border: 0, outline: 0, padding: 10, }}
                placeholder="Masukkan article..."
            />
            {
                generateState === RequestState.ERROR &&
                <span style={{ whiteSpace: 'pre-wrap', marginTop: 4, }}>{result.message}</span>
            }
            <div style={{ flexDirection: 'row', marginBlock: 10 }}>
                <button disabled={article === '' || generateState === RequestState.LOADING} onClick={() => {
                    optimizeArticle()
                    loadingButtonContent()
                }} style={{ paddingInline: 16, paddingBlock: 4, backgroundColor: article === '' || generateState === RequestState.LOADING ? Colors.disableBold : Colors.success, border: 0, outline: 0, borderRadius: 6, color: Colors.white }}>
                    {
                        buttonContent
                    }
                </button>
            </div>
            {
                generateState === RequestState.SUCCESS &&
                <span style={{ whiteSpace: 'pre-wrap' }}>{result?.content ?? ''}</span>
            }
        </div>
    )
}

export default memo(Demo2)