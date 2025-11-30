import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export interface User {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    login: string;
    @IsString()
    @MinLength(6)
    password: string;
}

export type ReturnUser = Omit<User, 'password'>;