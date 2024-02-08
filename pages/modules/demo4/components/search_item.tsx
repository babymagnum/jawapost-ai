import { FC } from "react"
import { CustomDiv } from "../../../components/custom_div"
import ArticleModel from "../model/article_model"
import { DETAIL_ARTICLE } from "../pages/detail_article";
import { useRouter } from 'next/router'

interface SearchItemProps {
    data: ArticleModel
    isLast: boolean
    index: number
}

export const SearchItem: FC<SearchItemProps> = ({ data, isLast, index }) => {
    const router = useRouter()

    return (
        <CustomDiv onDivClick={() => router.push({
            pathname: `/modules/demo4/pages/detail_article`,
            query: {
                index: index
            }
        })} style={{ marginTop: 10, marginBottom: isLast ? 10 : 0 }} paddingVertical={8} paddingHorizontal={10}
            children={<span style={{ marginInline: 0, whiteSpace: 'pre-wrap' }}>{data.content}</span>}
        />
    )
}