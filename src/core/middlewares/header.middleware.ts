import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderMiddeware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // remove server's information on header response
    res.removeHeader('X-Powered-By');
    res.removeHeader('Access-Control-Allow-Credentials');
    res.removeHeader('Access-Control-Allow-Origin');
    res.removeHeader('Connection');
    res.removeHeader('Date');
    res.removeHeader('Keep-Alive');
    res.removeHeader('Vary');

    return next();
  }
}
