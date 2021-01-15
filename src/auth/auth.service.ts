import {
    ForbiddenException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entity/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async login(username: string, password: string): Promise<UserEntity> {
        let passwordValid = false;
        const user = await this.userService.findByName(username);
        if (user) {
            passwordValid = bcrypt.compareSync(password, user.password);
        }
        if (user && user.isActive && passwordValid) {
            const { password, ...info } = user;
            return info;
        }
        throw new UnauthorizedException('username or password error');
    }

    async register(user: UserEntity): Promise<UserEntity> {
        const { username, password } = user;
        const find = await this.userService.findByName(username);
        if (find) throw new ForbiddenException('the username already exists');
        // 密码加密
        user.password = bcrypt.hashSync(password, 10);
        return this.userService.save(user);
    }
}
