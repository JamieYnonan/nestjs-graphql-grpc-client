import { Length, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { SignUpInput } from '../../graphql.schema';

export class SignUpRequest extends SignUpInput {
    @Length(3, 45)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @IsNotEmpty()
    password: string;
}
