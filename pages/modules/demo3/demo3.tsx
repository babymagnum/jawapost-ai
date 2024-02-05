import { FC, memo } from "react";
import { useDemo3Store } from "./demo3_store";
import { InputItem } from "./components/input_item";
import { Colors } from "../../helpers/const_strings";
import { ResultContent } from "./components/result_content";

interface Demo3Props { }

const Demo3: FC<Demo3Props> = () => {
    const inputItem = useDemo3Store(state => state.inputItem)
    const generateArticle = useDemo3Store(state => state.generateArticle)
    const addInput = useDemo3Store(state => state.addInput)

    function disableAction(): boolean {
        return inputItem.some(element => element === '')
    }

    return (
        <div style={{ flex: 1, flexDirection: 'column', display: 'flex', overflowX: 'hidden' }}>
            <h1 style={{marginInline: '15vw', marginBottom: 10}}>Generate Article</h1>
            {inputItem.map((element, index) => (
                <InputItem input={element} index={index} />
            ))}
            <div style={{ flexDirection: 'row', gap: 10, display: 'flex', marginInline: '15vw', marginTop: 10 }}>
                <button disabled={disableAction()} onClick={() => {
                    addInput('')
                }} style={{ paddingInline: 16, paddingBlock: 4, backgroundColor: disableAction() ? Colors.disableBold : Colors.genoa, border: 0, outline: 0, borderRadius: 6, color: Colors.white }}>
                    Add more
                </button>
                <button disabled={disableAction()} onClick={generateArticle} style={{ paddingInline: 16, paddingBlock: 4, backgroundColor: disableAction() ? Colors.disableBold : Colors.danger, border: 0, outline: 0, borderRadius: 6, color: Colors.white }}>
                    Generate
                </button>
            </div>
            <ResultContent />
        </div>
    )
}

export default memo(Demo3)