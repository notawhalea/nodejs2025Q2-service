import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpException,
    HttpStatus,
    ParseUUIDPipe,
    Delete,
    BadRequestException,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReturnUser } from './user.const';

@Controller('user')
export class UserConroller {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers(): ReturnUser[] {
        const processedUsers = this.userService
            .getAll()
            .map((user) => this.userService.getPublicInfo(user));
        return processedUsers;
    }

    @Get(':id')
    getUser(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () => new BadRequestException('User ID is not valid'),
            }),
        )
            id: string,
    ): ReturnUser {
        const user = this.userService.getById(id);
        if (!user)
            throw new HttpException(
                `User with ID ${id} was not found`,
                HttpStatus.NOT_FOUND,
            );
        const publicUserInfo = this.userService.getPublicInfo(user);
        return publicUserInfo;
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        const newUser = this.userService.create(createUserDto);
        const publicUserInfo = this.userService.getPublicInfo(newUser);
        return publicUserInfo;
    }

    @Delete(':id')
    @HttpCode(204)
    deleteUser(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () => new BadRequestException('User ID is not valid'),
            }),
        )
            id: string,
    ): void {
        const isUserDeleted = this.userService.delete(id);
        if (!isUserDeleted)
            throw new HttpException(
                `User with ID ${id} was not found`,
                HttpStatus.NOT_FOUND,
            );
    }
}