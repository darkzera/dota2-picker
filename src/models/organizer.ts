import { Model } from 'objection';
import User from './user';

export default class Organizer extends Model { 

    id!: number 
    nameOrganizer!: string
    movieNameSearch!: string
    userId!: number 

    static tableName = 'organizers';

    static jsonSchema = {
        type: 'object',
        required: ['nameOrganizer', 'userId'],
        properties: {
            id: { type: 'integer', minLength: 1, maxLength: 10 },
            nameOrganizer: { type: 'string', minLength: 1, maxLength: 50 },
            movieNameSearch: { type: 'string', minLength: 1, maxLength: 50 },
            userId: { type: 'integer' }
        },
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static relationMappings = () => ({
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: User,
            join: {
                from: "organizers.id",
                through: {
                    from: "organizers_users.organizerId",
                    to: "organizers_users.userId"
                },
                to: "users.id"
            },
        },

    })



}
