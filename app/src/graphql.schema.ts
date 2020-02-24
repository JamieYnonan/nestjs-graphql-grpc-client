
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class SignUpInput {
    name: string;
    email: string;
    password: string;
}

export abstract class IMutation {
    abstract signUp(signUpInput?: SignUpInput): SignedUp | Promise<SignedUp>;
}

export abstract class IQuery {
    abstract user(id: string): User | Promise<User>;
}

export class SignedUp {
    token: string;
    expireIn: number;
}

export class User {
    id: string;
    name: string;
    email: string;
    password: string;
}
