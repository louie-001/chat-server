import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() { username, password }): Promise<UserEntity> {
        return this.authService.login(username, password);
    }

    @Post('register')
    async register(@Body() user: UserEntity): Promise<UserEntity> {
        return this.authService.register(user);
    }
}
