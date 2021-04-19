import { Model } from "objection"
import Organizer from "./organizer"
import User from "./user"

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
        required: ['id', 'idOrganizer', 'ownerId'],
        properties: {
            id: { type: 'integer' },
            ownerId: { type: 'integer'},
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

        // ownerId: {
        //     relation: Model.BelongsToOneRelation,
        //     modelClass: User,
        //     from: "organizersmovie.ownerId",
        //     join: {
        //         from: "organizersmovie.organizerId",
        //         to: "organizers.id"
        //     }
        // }

    })

}