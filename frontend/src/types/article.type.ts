export type ArticleType = {
  text: string,
  comments: Array<CommentType>,
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string
}

export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: {
    id: string,
    name: string
  }
}

export type OtherCommentType = {
  allCount: number,
  comments: Array<CommentType>
}
