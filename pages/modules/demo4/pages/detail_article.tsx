import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'
import { useDemo4Store } from '../demo4_store'

export const DETAIL_ARTICLE = '/detail-article'

const DetailArticle = () => {
    const result = useDemo4Store(state => state.result)
    const router = useRouter()
    const { index } = router.query

    return (
        <>
            <h2>Detail Article</h2>
            {
                ((result?.data ?? [])[Number(index)]?.chunkWithSimilarDocuments ?? []).map((element, index) => {
                    return (
                        <div style={{flexDirection: 'column', display: 'flex'}}>
                            <span style={{whiteSpace: 'pre-wrap'}}>{index + 1}. {element.chunk}</span>
                            {(element.similarDocuments ?? []).map((_similar, _index) => {
                                return (
                                    <span style={{whiteSpace: 'pre-wrap'}}>{_index + 1}. {_similar.pageContent}</span>
                                )
                            })}
                        </div>
                    )
                })
            }
        </>
    )
}

export default DetailArticle