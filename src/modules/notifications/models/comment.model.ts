export type Comment = {
    _id: string
    author: {
        _id: string
        full_name: string
        username: string
    }
    discussion: string
    comment: string
    date: string
    is_res: boolean
    res_to?: string
}
