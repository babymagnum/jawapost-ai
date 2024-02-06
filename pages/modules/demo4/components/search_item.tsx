import { FC } from "react"
import { CustomDiv } from "../../../components/custom_div"
import { Colors } from "../../../helpers/const_strings"

interface SearchItemProps {
    data: QueryItemModel
    isLast: boolean
}

export const SearchItem: FC<SearchItemProps> = ({ data, isLast }) => {
    return (
        <CustomDiv style={{ marginTop: 10, marginBottom: isLast ? 10 : 0 }} paddingVertical={8} paddingHorizontal={10}
            children={(
                <>
                    <h3 style={{ marginInline: 0 }}>{data.title}</h3>
                    <h4 style={{ marginInline: 0 }}>{data.content}</h4>
                    <a style={{color: Colors.black}} href={data.url} target="_blank" rel="noreferrer">
                        Open link
                    </a>
                </>
            )}
        />
    )
}