/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from "objection";
import User from "./user";
import Organizer from "./organizer";

export default class OrganizerUser extends Model {
    id!: number
    userId!: number
    organizerId!: number

    static tableName = 'organizers_users';


    static jsonSchema = {
        type: 'object',
        required: ['userId', 'organizerId'],
        properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            organizerId: { type: 'integer' },
        }
    }

    static relationMappings = () => ({
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'organizers_users.userId',
                to: 'users.id'
            },
        },

        organizers: {
            relation: Model.BelongsToOneRelation,
            modelClass: Organizer,
            join: {
                from: 'organizers_users.organizerId',
                to: 'organizers.id'
            }
        },
    })



}