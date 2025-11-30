import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseUUIDPipe,
    Delete,
    BadRequestException,
    HttpCode,
    Put,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReturnUser, UpdatePasswordDto } from './user.interface';

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
                exceptionFactory: () =>
                    new BadRequestException('User ID is not valid'),
            }),
        )
            id: string,
    ): ReturnUser {
        const user = this.userService.getById(id);
        if (!user) throw new NotFoundException(`User with ID ${id} was not found`);
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
                exceptionFactory: () =>
                    new BadRequestException('User ID is not valid'),
            }),
        )
            id: string,
    ): void {
        const isUserDeleted = this.userService.delete(id);
        if (!isUserDeleted)
            throw new NotFoundException(`User with ID ${id} was not found`);
    }

    @Put(':id')
    updateUser(
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: () =>
                    new BadRequestException('User ID is not valid'),
            }),
        )
            id: string,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
        const { oldPassword, newPassword } = updatePasswordDto;
        const user = this.userService.getById(id);
        if (!user) throw new NotFoundException(`User with ID ${id} was not found`);
        if (oldPassword === newPassword)
            throw new BadRequestException(
                "New password can't be the same as old one",
            );
        if (user.password !== oldPassword)
            throw new ForbiddenException('User password is incorect');
        if (newPassword?.trim().length < 6)
            throw new BadRequestException(
                `Password should have at least 6 characters`,
            );
        const updatedUser = this.userService.update({ ...updatePasswordDto, id });
        const publicUserInfo = this.userService.getPublicInfo(updatedUser);
        return publicUserInfo;
    }
}