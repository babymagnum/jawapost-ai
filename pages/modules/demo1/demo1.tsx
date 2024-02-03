import { FC, useEffect, useState } from "react";
import { Colors } from "../../helpers/const_strings";
import { CustomDiv } from "../../components/custom_div";
import { UrlInput } from "./components/url_input";
import { RequestState } from "../../interface/request_state";
import { Demo1Result } from "./model/demo1_result";
import { ResultContent } from "./components/result_content";
import IcChatBot from "../../../assets/svg/ic_chatbot.svg";
import { Chatbox } from "./components/chatbox";

interface Demo1Props {

}

export const Demo1: FC<Demo1Props> = () => {
    const [result, setResult] = useState<Demo1Result>({})
    const [urlState, setUrlState] = useState(RequestState.IDLE)
    const [chatBoxVisible, setChatBoxVisible] = useState(false)

    return (
        <div style={{ paddingLeft: '15vw', paddingRight: '15vw', marginTop: '5vh' }}>
            <UrlInput
                onProcessResult={(result: Demo1Result) => {
                    setResult(result)
                }}
                urlState={urlState}
                setUrlState={setUrlState} />
            <ResultContent result={result} />
            <CustomDiv onDivClick={() => setChatBoxVisible(true)} borderRadius={1000} backgroundColor={Colors.genoa} style={{position: 'absolute', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', display: 'flex', bottom: 24, right: 24}} children={(<IcChatBot width={26} height={26} fill={Colors.white} />)} />
            <Chatbox setVisible={setChatBoxVisible} visible={chatBoxVisible} />
        </div>
    )
}