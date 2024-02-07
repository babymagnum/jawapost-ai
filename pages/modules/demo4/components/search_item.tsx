import { FC } from "react"
import { CustomDiv } from "../../../components/custom_div"
import { Colors } from "../../../helpers/const_strings"
import ArticleModel from "../model/article_model"

interface SearchItemProps {
    data: ArticleModel
    isLast: boolean
}

export const SearchItem: FC<SearchItemProps> = ({ data, isLast }) => {
    return (
        <CustomDiv style={{ marginTop: 10, marginBottom: isLast ? 10 : 0 }} paddingVertical={8} paddingHorizontal={10}
            children={(
                <>
                    <span style={{ marginInline: 0, whiteSpace: 'pre-wrap' }}>{data.content}</span>
                </>
            )}
        />
    )
}