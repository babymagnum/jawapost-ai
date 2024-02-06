import { useEffect, useRef } from "react";
import { useDemo1Store } from "../demo1_store";

export const ResultContent = () => {
    const result = useDemo1Store(state => state.result)
    const setScrollPosition = useDemo1Store(state => state.setScrollPosition)
    const scrollPosition = useDemo1Store(state => state.scrollPosition)
    const divRef = useRef<HTMLDivElement>()
    
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = scrollPosition
        }
    }, [])

    return (
        <div ref={divRef} onScroll={(event) => {            
            setScrollPosition(event.currentTarget.scrollTop)
        }} style={{ flex: 1, overflowY: 'auto', paddingInline: '10vw' }}>
            <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{result ?? ''}</p>            
        </div>
    )
}