import { Model } from 'objection';
import Organizer from './organizer';

export default class User extends Model {
    id!: number
    name!: string
    job_role!: string

    static tableName = 'users';

    static jsonSchema = {
        type: 'object',
        required: ['name', 'job_role'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 50 },
            job_role: { type: 'string', minLength: 1, maxLength: 20 },
        }
    }


    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static relationMappings = () => ({
        organizers: {
            relation: Model.ManyToManyRelation,
            modelClass: Organizer,
            join: {
                from: "users.id",
                through: {
                    from: "organizers_users.userId",
                    to: "organizers_users.organizerId"
                },
                to: "organizers.id"
            },
        },
    })


}


