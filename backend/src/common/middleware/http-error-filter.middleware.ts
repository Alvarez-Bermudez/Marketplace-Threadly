/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.message;

    console.error(`Error ${status}: ${message}`);
    console.error(`Request Body: ${JSON.stringify(request.body)}`);
    console.error(`Request Params: ${JSON.stringify(request.params)}`);
    console.error(`Request Query: ${JSON.stringify(request.query)}`);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
