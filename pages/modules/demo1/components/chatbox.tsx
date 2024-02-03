import { Dispatch, FC, LegacyRef, SetStateAction, useEffect, useRef, useState } from "react";
import { CustomDiv } from "../../../components/custom_div";
import { Colors } from "../../../helpers/const_strings";
import IcDown from "../../../../assets/svg/ic_arrow_down.svg"
import IcSend from "../../../../assets/svg/ic_send.svg"
import { ChatsModel } from "../model/chats_model";
import { format } from "date-fns";
import { RequestState } from "../../../interface/request_state";
import { StandartModel } from "../../../api/model/standart_model";

interface ChatboxInterface {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    isArticleExist: boolean
}

export const Chatbox: FC<ChatboxInterface> = ({ visible, setVisible, isArticleExist }) => {

    const divRef = useRef<HTMLDivElement>();
    const [query, setQuery] = useState('')
    const [chats, setChats] = useState<ChatsModel[]>([])
    const [askOpenAIState, setAskOpenAIState] = useState(RequestState.IDLE)

    useEffect(() => {        
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [chats, visible]);

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
                }),
            });
            setAskOpenAIState(response.status === 200 ? RequestState.SUCCESS : RequestState.ERROR);

            const data: StandartModel = await response.json();

            if (response.status !== 200) {
                alert(data.message ?? 'error!');
                return;
            }

            // set the result
            setChats((state) => [...state, {
                isFromChatbot: true,
                content: data.content ?? '',
                date: format(Date(), 'HH:mm')
            }])
        } catch (error) {
            console.log(`fetch error: ${error}`)
            // Consider implementing your own error handling logic here
            alert(error.message);
        }
    }

    return (visible &&
        <CustomDiv
            style={{ height: '50vh', width: 400, display: 'flex', alignItems: 'start', flexDirection: 'column', position: 'absolute', bottom: 0, right: 10 }}
            borderRadius={6}
            children={(
                <>
                    <div style={{ flexDirection: 'row', width: '100%', gap: 10, display: 'flex', alignItems: 'center' }}>
                        <h2 style={{ flex: 1, marginLeft: 10 }}>Chatbot</h2>
                        <div style={{ marginRight: 10 }} onClick={() => setVisible(false)}>
                            <IcDown width={24} height={24} stroke={Colors.black} />
                        </div>
                    </div>
                    <div style={{ height: 1, width: '100%', backgroundColor: Colors.disableLight }} />
                    <div ref={divRef} style={{ overflowY: 'auto', width: '100%', flex: 1, }}>
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

                            if (!isArticleExist) {
                                alert('Silakan cari article terlebih dahulu!');
                                return
                            }

                            if (askOpenAIState === RequestState.LOADING) return

                            askOpenAI(query)
                            setChats((state) => [...state, {
                                isFromChatbot: false,
                                content: query,
                                date: format(Date(), 'HH:mm')
                            }])
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