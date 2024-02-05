import React, {  } from "react"
import { RequestState } from "../../../interface/request_state";
import { CustomDiv } from "../../../components/custom_div";
import { Colors } from "../../../helpers/const_strings";
import IcRetry from "../../../../assets/svg/ic_retry.svg"
import IcSearch from "../../../../assets/svg/ic_search.svg"
import { TailSpin } from "react-loader-spinner";
import { useDemo1Store } from "../demo1_store";
import { StandartModel } from "../../../api/model/standart_model";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const UrlInput = () => {
    const url = useDemo1Store(state => state.url)
    const errorUrl = useDemo1Store(state => state.errorUrl)
    const setUrl = useDemo1Store(state => state.setUrl)
    const setErrorUrl = useDemo1Store(state => state.setErrorUrl)
    const urlState = useDemo1Store(state => state.urlState)
    const setUrlState = useDemo1Store(state => state.setUrlState)
    const setResult = useDemo1Store(state => state.setResult)

    async function proccessUrl() {
        if (url === '') {
            setErrorUrl('Url tidak boleh kosong!')
            return
        }

        try {
            setUrlState(RequestState.LOADING);
            const response = await fetch("/api/extract_article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: url,
                }),
            });
            setUrlState(response.status === 200 ? RequestState.SUCCESS : RequestState.ERROR);

            const data: StandartModel = await response.json();

            if (response.status !== 200) {
                alert(data.message ?? 'error!');
                return;
            }

            // set the result
            setResult(data.content ?? '')
        } catch (error) {
            console.log(`fetch error: ${error}`)
            // Consider implementing your own error handling logic here
            alert(error.message);
        }
    }

    return (
        <div style={{ marginInline: '15vw' }}>
            <CustomDiv paddingHorizontal={12} paddingVertical={8} children={(
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <input
                        value={url}
                        onChange={(event) => {
                            setUrl(event.target.value.trim())
                            setErrorUrl(event.target.value.trim() === '' ? 'Url tidak boleh kosong!' : '')
                        }}
                        placeholder="Input url..."
                        style={{ borderWidth: 0, fontSize: 16, outline: 0, flex: 1, backgroundColor: 'transparent' }}
                    />
                    {
                        urlState === RequestState.LOADING ?
                            <div style={{ width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <TailSpin
                                    visible={true}
                                    height={20}
                                    width={20}
                                    color={Colors.genoa}
                                    strokeWidth={3}
                                />
                            </div> :
                            urlState === RequestState.ERROR ?
                                <div onClick={proccessUrl} style={{ width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <IcRetry stroke={Colors.danger} width={24} height={24} />
                                </div> :
                                <div onClick={proccessUrl} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Image src={IcSearch} width={36} height={36} alt={IcSearch} /> */}
                                    <IcSearch stroke={Colors.black} width={36} height={36} />
                                </div>
                    }
                </div>
            )} />
            {errorUrl !== '' &&
                <p style={{ marginTop: 6, fontSize: 12, color: Colors.danger }}>{errorUrl}</p>}
        </div>
    )
}