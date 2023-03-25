import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    /**
     * if token request is valid, this validate function will be automatically executed
     * @param jwtPayload
     * @returns req.user.userId
     * @returns req.user.username
     */
    async validate(jwtPayload: JwtPayload): Promise<{ userId: string; username: string }> {
        /**
         * mặc định Nest sẽ tự động đính property `user` vào phần `@Request() req`
         * property `user` này sẽ khả dụng xuyên suốt quá trình mà thời hạn `expiresIn` còn hiệu lực
         * @returns req.user.userId
         * @returns req.user.username
         */

        return { userId: jwtPayload.userId, username: jwtPayload.email };
    }
}
