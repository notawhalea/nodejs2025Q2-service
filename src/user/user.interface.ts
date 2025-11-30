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
  @MinLength(3)
  login: string;
  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export type ReturnUser = Omit<User, 'password'>;
export type UpdateUserProps = UpdatePasswordDto & Pick<User, 'id'>;
