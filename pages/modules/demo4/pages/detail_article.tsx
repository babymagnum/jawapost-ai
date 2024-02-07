import { FC } from "react";
import ArticleModel from "../model/article_model";

interface DetailArticleProps {
    data: ArticleModel
}

export const DetailArticle: FC<DetailArticleProps> = ({ data }) => {
    return (
        <>
        <h2>Detail Article</h2>
        </>
    )
}