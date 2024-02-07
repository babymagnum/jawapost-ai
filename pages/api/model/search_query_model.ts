import ArticleModel from "../../modules/demo4/model/article_model"

export interface SearchArticleModel {
    message: string
    data?: ArticleModel[]
}