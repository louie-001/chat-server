import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { AppEntity } from '../../app.entity';

@Entity('user')
export class UserEntity extends AppEntity {
    @Column({
        type: 'varchar',
        length: 32,
        unique: true,
        comment: 'user name'
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: true,
        comment: 'nick name'
    })
    nickName: string;

    @Column({
        type: 'varchar',
        length: 32
    })
    password?: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    avatar: string;

    @Column({
        type: 'bool',
        default: true
    })
    isActive: boolean;
}
