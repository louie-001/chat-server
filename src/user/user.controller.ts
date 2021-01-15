import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async list(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

    @Post()
    async save(@Body() user: UserEntity): Promise<UserEntity> {
        return this.userService.save(user);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() user: UserEntity
    ): Promise<UpdateResult> {
        return this.userService.updateById(id, user);
    }

    @Get(':id')
    async detail(@Param('id') id: number): Promise<UserEntity> {
        return this.userService.detail(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.userService.delete(id);
    }
}
