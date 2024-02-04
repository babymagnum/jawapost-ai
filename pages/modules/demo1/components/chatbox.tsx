import { useEffect, useRef } from "react";
import { CustomDiv } from "../../../components/custom_div";
import { Colors } from "../../../helpers/const_strings";
import IcDown from "../../../../assets/svg/ic_arrow_down.svg"
import IcSend from "../../../../assets/svg/ic_send.svg"
import { format } from "date-fns";
import { RequestState } from "../../../interface/request_state";
import { StandartModel } from "../../../api/model/standart_model";
import { useDemo1Store } from "../demo1_store";

export const Chatbox = () => {
    const articleResult = useDemo1Store(state => state.result)
    const chatBoxVisible = useDemo1Store(state => state.chatBoxVisible)
    const query = useDemo1Store(state => state.query)
    const askOpenAIState = useDemo1Store(state => state.askOpenAIState)
    const setQuery = useDemo1Store(state => state.setQuery)
    const setChatBoxVisible = useDemo1Store(state => state.setChatBoxVisible)
    const setAskOpenAIState = useDemo1Store(state => state.setAskOpenAIState)
    const chats = useDemo1Store(state => state.chats)
    const addChats = useDemo1Store(state => state.addChats)
    const divRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [chats, chatBoxVisible]);

    async function askOpenAI(query: string) {
        try {
            setAskOpenAIState(RequestState.LOADING);
            const response = await fetch("/api/chatbot_article", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: query,
                    lastAIMessage: chats.length > 0 ? chats.slice(-1)[0].content : '',
                    lastUserMessage: chats.length > 0 ? chats.slice(-2)[0].content : '',
                }),
            });
            setAskOpenAIState(response.status === 200 ? RequestState.SUCCESS : RequestState.ERROR);

            const data: StandartModel = await response.json();

            if (response.status !== 200) {
                alert(data.message ?? 'error!');
                return;
            }

            // set the result
            addChats({
                isFromChatbot: true,
                content: data.content ?? '',
                date: format(Date(), 'HH:mm')
            })
        } catch (error) {
            console.log(`fetch error: ${error}`)
            // Consider implementing your own error handling logic here
            alert(error.message);
        }
    }

    return (chatBoxVisible &&
        <CustomDiv
            style={{ height: '50vh', width: 400, display: 'flex', alignItems: 'start', flexDirection: 'column', position: 'absolute', bottom: 0, right: 10 }}
            borderRadius={6}
            children={(
                <>
                    <div style={{ flexDirection: 'row', width: '100%', gap: 10, display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ flex: 1, marginLeft: 10 }}>Chatbot</h2>
                        <div style={{ marginRight: 10 }} onClick={() => setChatBoxVisible(false)}>
                            <IcDown width={24} height={24} stroke={Colors.black} />
                        </div>
                    </div>
                    <div style={{ height: 1, width: '100%', backgroundColor: Colors.disableLight }} />
                    <div ref={divRef}  style={{ overflowY: 'auto', width: '100%', flex: 1, }}>
                        {
                            chats.map((element, index) => (
                                <div style={{ width: '100%', flexDirection: 'row', overflowX: 'hidden', display: 'flex', justifyContent: element.isFromChatbot ? 'start' : 'end' }}>
                                    <div key={index} style={{ maxWidth: 250, marginTop: 8, marginRight: 8, marginLeft: 8, marginBottom: index === chats.length - 1 ? 8 : 0, paddingBlock: 4, borderRadius: 6, paddingInline: 10, backgroundColor: element.isFromChatbot ? Colors.disableLight : Colors.success, gap: 4, display: 'table' }}>
                                        <p style={{ fontSize: 16, whiteSpace: 'pre-wrap', marginBlock: 0, color: element.isFromChatbot ? Colors.black : Colors.white }}>{element.content}</p>
                                        <div style={{ width: '100%', marginTop: 4, flexDirection: 'row', display: 'flex', justifyContent: 'end' }}>
                                            <span style={{ fontSize: 12, color: element.isFromChatbot ? Colors.black : Colors.white }}>{element.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div style={{ flexDirection: 'row', width: '100%', alignItems: 'center', backgroundColor: Colors.disableLight20, gap: 10, display: 'flex' }}>
                        <textarea value={query} onChange={(event) => setQuery(event.target.value)} style={{ flex: 1, height: 50, backgroundColor: 'transparent', border: 0, outline: 0, resize: 'none', padding: 10 }} placeholder="Tulis pertanyaan" />
                        <div style={{ marginRight: 10 }} onClick={() => {
                            if (query === '') return

                            if (articleResult === undefined) {
                                alert('Silakan cari article terlebih dahulu!');
                                return
                            }

                            if (askOpenAIState === RequestState.LOADING) return

                            askOpenAI(query)
                            addChats({
                                isFromChatbot: false,
                                content: query,
                                date: format(Date(), 'HH:mm')
                            })
                            setQuery('')
                        }}>
                            <IcSend width={24} height={24} stroke={query === '' ? Colors.disableBold : Colors.genoa} />
                        </div>
                    </div>
                </>
            )}
        />
    )
}