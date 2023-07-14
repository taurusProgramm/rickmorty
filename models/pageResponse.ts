import ICharacter from '@/models/characterModel'

export default interface IPageResponse {
    info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null
    },
    results: ICharacter[]
}