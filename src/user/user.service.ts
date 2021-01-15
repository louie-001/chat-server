import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    /**
     * find all users
     */
    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    /**
     * find by user's account
     * @param username
     */
    async findByName(username: string): Promise<UserEntity> {
        return this.userRepository.findOne({ username });
    }

    /**
     * save user
     * @param user
     */
    async save(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    /**
     * update user by primary key
     * @param id user's primary key
     * @param user new data
     */
    async updateById(id: number, user: UserEntity): Promise<UpdateResult> {
        return this.userRepository.update(id, user);
    }

    /**
     * fetch user detail
     * @param id user's primary key
     */
    async detail(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne(id);
        if (!user)
            throw new HttpException(
                'can not find user by id: ' + id,
                HttpStatus.NOT_FOUND
            );
        const { password, ...info } = user;
        return info;
    }

    /**
     * delete user by primary key
     * @param id user's primary key
     */
    async delete(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
}
