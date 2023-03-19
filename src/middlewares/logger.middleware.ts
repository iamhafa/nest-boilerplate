import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        // do something...
        res.removeHeader('X-Powered-By');
        res.removeHeader('access-control-allow-credentials');
        res.removeHeader('vary');

        console.log('Request...');
        return next();
    }
}
