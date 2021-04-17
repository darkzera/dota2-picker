import * as Knex from "knex";
import { UserService } from "../src/services/user"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries from tables 


    await knex('organizers_users').del();
    await knex('organizers').del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, name: "Valderrama", job_role: "Devops", email: 'Valder@rama.net', password: UserService.hashPassword('12345')},
        { id: 2, name: "Lucas", job_role: "React dev", email: 'lucas@dot.com', password: UserService.hashPassword('sk333') },
        { id: 3, name: "Rafael", job_role: "Java Backend", email: 'rafa@fael.com' , password: UserService.hashPassword('sik3344')},
        { id: 4, name: "Bessias", job_role: "C++ Backend" , email: 'Jair@Bessi.com', password: UserService.hashPassword('abracadabra') },
    ]);



}
