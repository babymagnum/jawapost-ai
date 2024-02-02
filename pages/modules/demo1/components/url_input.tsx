import React, { FC, useState } from "react"
import { Demo1Result } from "../model/demo1_result"
import { RequestState } from "../../../interface/request_state";
import { CustomDiv } from "../../../components/custom_div";
import { Colors } from "../../../helpers/const_strings";
import IcRetry from "../../../../assets/svg/ic_retry.svg"
import IcSearch from "../../../../assets/svg/ic_search.svg"
import { TailSpin } from "react-loader-spinner";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface UrlInputProps {
    onProcessResult: (result: Demo1Result) => void
    urlState: RequestState
    setUrlState: React.Dispatch<React.SetStateAction<RequestState>>
}

export const UrlInput: FC<UrlInputProps> = ({ onProcessResult, urlState, setUrlState }) => {
    const [url, setUrl] = useState('')
    const [errorUrl, setErrorUrl] = useState('')

    async function proccessUrl() {
        if (url === '') {
            setErrorUrl('Url tidak boleh kosong!')
            return
        }

        setUrlState(RequestState.LOADING)
        await delay(1000)
        setUrlState(RequestState.SUCCESS)

        onProcessResult({
            klasifikasi: 'klasifikasi',
            labelling: 'labelling',
            kategori: 'kategori',
            sentiment: 'sentiment'
        })
    }

    return (
        <>
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
                                <div onClick={proccessUrl} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {/* <Image src={IcSearch} width={36} height={36} alt={IcSearch} /> */}
                                    <IcSearch stroke={Colors.black} width={36} height={36} />
                                </div>
                    }
                </div>
            )} />
            {errorUrl !== '' &&
                <p style={{ marginTop: 6, fontSize: 12, color: 'darkorange' }}>{errorUrl}</p>}
        </>
    )
}