interface SearchQueryModel {
    message: string
    data?: QueryItemModel[]
}

interface QueryItemModel {
    title: string
    url: string
    content: string
    score: number
}