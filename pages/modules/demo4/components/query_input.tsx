import { CustomDiv } from "../../../components/custom_div"
import { Colors } from "../../../helpers/const_strings"
import { useDemo4Store } from "../demo4_store"
import IcSearch from "../../../../assets/svg/ic_search.svg"
import IcRetry from "../../../../assets/svg/ic_retry.svg"
import { RequestState } from "../../../interface/request_state"
import { TailSpin } from "react-loader-spinner"

export const QueryInput = () => {
    const article = useDemo4Store(state => state.article)
    const searchArticle = useDemo4Store(state => state.searchArticle)
    const queryState = useDemo4Store(state => state.articleState)
    const queryError = useDemo4Store(state => state.articleError)
    const setArticle = useDemo4Store(state => state.setArticle)
    const setArticleError = useDemo4Store(state => state.setArticleError)

    return (
        <>
            <CustomDiv paddingVertical={10} paddingHorizontal={8} style={{ marginInline: '5vw' }} children={(
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <input
                        value={article}
                        onChange={(event) => {
                            setArticle(event.target.value)
                            setArticleError(event.target.value === '' ? 'Query tidak boleh kosong!' : '')
                        }}
                        placeholder="Input query..."
                        style={{ borderWidth: 0, fontSize: 16, outline: 0, flex: 1, backgroundColor: 'transparent' }}
                    />
                    {
                        queryState === RequestState.LOADING ?
                            <div style={{ width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TailSpin
                                    visible={true}
                                    height={20}
                                    width={20}
                                    color={Colors.genoa}
                                    strokeWidth={3}
                                />
                            </div> :
                            queryState === RequestState.ERROR ?
                                <div onClick={searchArticle} style={{ width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <IcRetry stroke={Colors.danger} width={24} height={24} />
                                </div> :
                                <div onClick={searchArticle} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <IcSearch stroke={Colors.black} width={36} height={36} />
                                </div>
                    }
                </div>
            )} />
            {queryError !== '' &&
                <p style={{ marginTop: 6, fontSize: 12, color: Colors.danger }}>{queryError}</p>}
        </>
    )
}