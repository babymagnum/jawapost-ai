import { memo } from "react";
import { Colors } from "../../helpers/const_strings";
import { CustomDiv } from "../../components/custom_div";
import { UrlInput } from "./components/url_input";
import { ResultContent } from "./components/result_content";
import IcChatBot from "../../../assets/svg/ic_chatbot.svg";
import { Chatbox } from "./components/chatbox";
import { useDemo1Store } from "./demo1_store";

const Demo1 = () => {
    const setChatBoxVisible = useDemo1Store(state => state.setChatBoxVisible)    

    return (
        <div style={{ flex: 1, flexDirection: 'column', display: 'flex', overflowX: 'hidden' }}>
            <h1 style={{ marginBottom: 10, marginInline: '10vw' }}>Extract Article</h1>
            <UrlInput />
            <ResultContent />
            <CustomDiv onDivClick={() => setChatBoxVisible(true)} borderRadius={1000} backgroundColor={Colors.genoa} style={{ position: 'absolute', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', display: 'flex', bottom: 24, right: 24 }} children={(<IcChatBot width={26} height={26} fill={Colors.white} />)} />
            <Chatbox />
        </div>
    )
}

export default memo(Demo1)