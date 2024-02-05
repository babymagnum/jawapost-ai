import { useEffect, useRef } from "react";
import { useDemo3Store } from "../demo3_store";
import { RequestState } from "../../../interface/request_state";
import { TailSpin } from "react-loader-spinner";
import { Colors } from "../../../helpers/const_strings";
import IcRetry from "../../../../assets/svg/ic_retry.svg"

export const ResultContent = () => {
    const result = useDemo3Store(state => state.result)
    const setScrollPosition = useDemo3Store(state => state.setScrollPosition)
    const scrollPosition = useDemo3Store(state => state.scrollPosition)
    const generateState = useDemo3Store(state => state.generateState)
    const generateArticle = useDemo3Store(state => state.generateArticle)
    const divRef = useRef<HTMLDivElement>()

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = scrollPosition
        }
    }, [])

    if (generateState === RequestState.LOADING) {
        return (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TailSpin
                    visible={true}
                    height={32}
                    width={32}
                    color={Colors.genoa}
                    strokeWidth={3}
                />
            </div>
        )
    }
    else if (generateState === RequestState.ERROR) {
        return (
            <div onClick={generateArticle} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IcRetry width={24} height={24} stroke={Colors.danger} />
            </div>
        )
    }
    else {
        return (
            <div ref={divRef} onScroll={(event) => {
                setScrollPosition(event.currentTarget.scrollTop)
            }} style={{ flex: 1, overflowY: 'auto', paddingInline: '15vw' }}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{result ?? ''}</p>
            </div>
        )
    }

}