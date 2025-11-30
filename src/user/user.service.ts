import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User, CreateUserDto, ReturnUser } from './user.const';

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
        const lengthBeforeDeletion = this._users.length;
        this._users = this._users.filter((user) => user.id !== id);
        return lengthBeforeDeletion > this._users.length;
    }
}