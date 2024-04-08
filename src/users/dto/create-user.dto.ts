import { IsString, IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: "valid role required"
    }) 
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
