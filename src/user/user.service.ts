import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User, CreateUserDto, ReturnUser, UpdateUserProps } from './user.interface';

@Injectable()
export class UserService {
    private _users: User[] = [];

    public getPublicInfo({
        id,
        login,
        version,
        createdAt,
        updatedAt,
    }: User): ReturnUser {
        return { id, login, version, createdAt, updatedAt };
    }

    public getAll(): User[] {
        return this._users;
    }

    public getById(id: string): User | null {
        return this._users.find((user) => user.id === id);
    }

    public create({ login, password }: CreateUserDto): User {
        const createdAt = Date.now();
        const newUser: User = {
            id: randomUUID(),
            login,
            password,
            version: 1,
            createdAt,
            updatedAt: createdAt,
        };
        this._users.push(newUser);

        return newUser;
    }

    public delete(id: string) {
        const user = this.getById(id);
        if (!user) return false;
        this._users = this._users.filter((user) => user.id !== id);
        return true;
    }

    public update({ newPassword, id }: UpdateUserProps): User | null {
        const user = this.getById(id);
        if (!user) return null;
        const userIndex = this._users.findIndex((user) => user.id === id);
        const updatedAt = Date.now();
        const updatedUser: User = {
            ...user,
            password: newPassword,
            version: user.version + 1,
            updatedAt,
        };
        this._users[userIndex] = updatedUser;
        return updatedUser;
    }
}