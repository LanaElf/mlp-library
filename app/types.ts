export type Chapter = {
    id: number
    name: string
    fileName: string
    anchor: string
    content: string
    link: string
}

export type Character = {
    name: string
    fileName: string
}

export type Fanfic = {
    id: number
    name: string
    pathName: string
    wordCount: number
    chaptersCount: number
    authorName: string
    authorLink: string
    genres: string[]
    sourceLink: string
    characters: string[]
    chapters: Chapter[]
}

export type Bookmark = {
    fanficId: number;
    fanficName: string;
    chapterId: number;
    contentType: 'src' | 'text';
    content: string;
}