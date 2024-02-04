import { url } from "inspector"
import { TailSpin } from "react-loader-spinner"
import { CustomDiv } from "../../../components/custom_div"
import { Colors } from "../../../helpers/const_strings"
import { RequestState } from "../../../interface/request_state"
import { useDemo3Store } from "../demo3_store"
import { FC } from "react"
import IcDelete from "../../../../assets/svg/ic_delete.svg"

type InputItemProps = {
    input: string
    index: number
}

export const InputItem: FC<InputItemProps> = ({ input, index }) => {

    const updateInput = useDemo3Store(state => state.updateInput)
    const deleteInput = useDemo3Store(state => state.deleteInput)

    return (
        <CustomDiv style={{ marginTop: index === 0 ? 0 : 8 }} paddingHorizontal={12} paddingVertical={8} children={(
            <div style={{ flexDirection: 'row', gap: 10, display: 'flex', alignItems: 'center' }}>
                <input
                    value={input}
                    onChange={(event) => {
                        updateInput(index, event.target.value)
                    }}
                    placeholder="Input point..."
                    style={{ borderWidth: 0, fontSize: 16, outline: 0, flex: 1, backgroundColor: 'transparent' }}
                />
                {index !== 0 &&
                    <div onClick={() => deleteInput(index)}>
                        <IcDelete width={16} height={16} fill={Colors.danger} />
                    </div>
                }
            </div>
        )} />
    )
}