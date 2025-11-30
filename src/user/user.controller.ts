import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ReturnUser, UpdatePasswordDto } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): ReturnUser[] {
    return this.userService
      .getAll()
      .map((user) => this.userService.getPublicInfo(user));
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
    if (!user) throw new NotFoundException(`User with ID ${id} was not found`);
    return this.userService.getPublicInfo(user);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto);
    return this.userService.getPublicInfo(newUser);
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
      throw new NotFoundException(`User with ID ${id} was not found`);
  }

  @Put(':id')
  updateUser(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => new BadRequestException('User ID is not valid'),
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
    return this.userService.getPublicInfo(updatedUser);
  }
}
