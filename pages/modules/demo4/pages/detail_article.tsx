import { useRouter } from 'next/router'
import { useDemo4Store } from '../demo4_store'

const DetailArticle = () => {
    const result = useDemo4Store(state => state.result)
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <h2>Detail Article</h2>
            {
                ((result?.data ?? []).find(element => element.id === Number(id))?.chunkWithSimilarDocuments ?? []).map((element, index) => {
                    return (
                        <div style={{ flexDirection: 'column', display: 'flex' }}>
                            <span style={{ whiteSpace: 'pre-wrap' }}>{index + 1}. {element.chunk}</span>
                            <ul>
                                {(element.similarDocuments ?? []).map(_similar => {
                                    return (
                                        <li style={{ whiteSpace: 'pre-wrap', marginLeft: '3vw' }}>{_similar.pageContent}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
            }
        </>
    )
}

export default DetailArticle