import { Injectable } from '@nestjs/common';
import { User } from './user.const';

@Injectable()
export class UserService {
    private _users: User[] = [];

    public getAll() {
        return this._users;
    }

    public getById(id: string) {
        return this._users.find((user) => user.id === id);
    }
}