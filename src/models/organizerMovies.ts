import { Model } from "objection"
import Organizer from "./organizer"

export default class OrganizerMovies extends Model {

    id!: number
    organizerId!: number
    adult!: boolean
    backdrop_path!: string
    genre_ids!: string
    idMovie!: number
    original_language!: string
    original_title!: string
    overview!: string
    poster_path!: string
    release_date!: string
    title!: string
    video!: boolean

    static tableName = 'organizermovie';

    static jsonSchema = {
        type: 'object',
        required: ['id', 'idOrganizer'],
        properties: {
            id: { type: 'integer' },
            organizerId: { type: 'integer' },
            adult: { type: 'boolean' },
            backdrop_path: { type: 'string' },
            genre_ids: { type: 'string' },
            idMovie: { type: 'string' },
            original_language: { type: 'string' },
            original_title: { type: 'string' },
            overview: { type: 'string' },
            poster_path!: { type: 'string' },
            release_date: { type: 'string' },
            title: { type: 'string' },
            video: { type: 'boolean' },
        }
    }

    static relationMappings = () => ({
        organizers: {
            relation: Model.BelongsToOneRelation,
            modelClass: Organizer,
            join: {
                from: "organizersmovie.organizerId",
                to: "organizers.id"
            },
        }

    })

}