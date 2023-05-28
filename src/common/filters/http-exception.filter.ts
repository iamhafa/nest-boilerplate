import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { RESULTS, STATUSCODE } from 'src/common/constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response: Response = context.getResponse<Response>();
    const errorMessage: string = exception.message;

    /**
     * @implements customize data response
     */
    response.status(STATUSCODE.NG).json({
      results: RESULTS.NG,
      messageID: '',
      errorMessage: errorMessage,
    });
  }
}
