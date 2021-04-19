export interface UserInterface {
    name: string,
    job_role: string
    email: string,
    password: string,
}

export interface DecodedUser extends Omit<UserInterface, 'id'> {
    id: string
}