/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-globals */
interface UserResult<T> {
    _doc: T;
}

export interface IUser extends UserResult<IUser> {
    firstName: string
    lastName: string
    email: string
    avatar: string
    phone: string
    password: string
    isAdmin: boolean
    isActive: boolean
    isBanned: boolean
	generateVerificationToken: () => void
}