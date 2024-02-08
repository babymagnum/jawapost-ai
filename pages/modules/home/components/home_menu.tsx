import { FC } from "react"
import { Colors } from "../../../helpers/const_strings"

interface HomeMenuProps {
    selected: boolean
    content: string
    onDivClick: () => void
}

export const HomeMenu: FC<HomeMenuProps> = ({ selected, content, onDivClick }) => {
    return (
        <div onClick={onDivClick} style={{ backgroundColor: selected ? Colors.genoa : 'transparent', paddingBlock: 10, paddingInline: 10 }}>
            <span style={{ fontSize: 20, fontWeight: 'bold', color: selected ? Colors.white : Colors.black }}>{content}</span>
        </div>
    )
}