import { Model } from 'objection';
import Organizer from './organizer';
import { UserService } from '@src/services/user';

export default class User extends Model {
    id!: number
    name!: string
    job_role!: string
    email!: string
    password!: string

    static tableName = 'users';

    get publicData(): string {
        return this.name+ " - "+ 
            this.job_role+ " - "+ 
            this.email 
    }

    get pwdHashed(): string {
        return this.password;
    }

    // getOrganizers(): Promise<Organizer>{
    //     return Organizer.query().where()
    // }


    $beforeInsert(): void{
        this.password = UserService.hashPassword(this.password);
    }


    static jsonSchema = {
        type: 'object',
        required: ['name', 'job_role'],
        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 50 },
            job_role: { type: 'string', minLength: 1, maxLength: 20 },
            email: { type: 'string', minLength: 1, maxLength: 30},
            password: { type: 'string', minLength: 1, maxLength: 50},
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


