export type Image = {
    png: string,
    webp: string
}

export type User = {
    image: Image,
    username: string,
}

export type Reply = {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    replyingTo: string,
    user: User
}

export type CommentType = {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: User,
    replies: Reply[]   
}