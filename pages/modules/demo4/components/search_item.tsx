import { FC } from "react"
import { CustomDiv } from "../../../components/custom_div"
import ArticleModel from "../model/article_model"
import { useRouter } from 'next/router'

interface SearchItemProps {
    data: ArticleModel
    isLast: boolean
}

export const SearchItem: FC<SearchItemProps> = ({ data, isLast }) => {
    const router = useRouter()

    return (
        <CustomDiv onDivClick={() => router.push({
            pathname: `/modules/demo4/pages/detail_article`,
            query: {
                id: data.id
            }
        })} style={{ marginTop: 10, marginBottom: isLast ? 10 : 0 }} paddingVertical={8} paddingHorizontal={10}
            children={<span style={{ marginInline: 0, whiteSpace: 'pre-wrap' }}>{data.content}</span>}
        />
    )
}