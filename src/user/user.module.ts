import { Module } from '@nestjs/common';
import { UserConroller } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [UserConroller],
    providers: [UserService],
})
export class UserModule {}