import IEpisode from '@/models/episodeModel'

export default interface ICharacter {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    episodeObj: IEpisode[] | null,
    url: string,
    created: string
}