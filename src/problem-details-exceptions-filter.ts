import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProblemDetailsException } from './problem-details-exception';

@Catch()
export class ProblemDetailsExceptionsFilter implements ExceptionFilter {
  DEFAULT_TITLE_MAP: Record<number, string> = {
    // 4×× Client Error
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'Request-URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Upgrade Required',
    426: 'Precondition Required',
    428: 'Too Many Requests',
    429: 'Request Header Fields Too Large',
    444: 'Connection Closed Without Response',
    431: 'Unavailable For Legal Reasons',
    499: 'Client Closed Request',
    // 5×× Server Error
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
    599: 'Network Connect Timeout Error',
  };

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof ProblemDetailsException) {
      return response.status(exception.getStatus()).json(exception.toArray());
    }

    if (exception instanceof HttpException) {
      console.log(exception);
      const exceptionResponse = exception.getResponse() as {
        statusCode: number;
        message: Array<string>;
        error: string;
      };

      const detail = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message;

      return response.status(exceptionResponse.statusCode).json({
        status: exceptionResponse.statusCode,
        type: `https://httpstatuses.com/${exceptionResponse.statusCode}`,
        title: this.DEFAULT_TITLE_MAP[exception.getStatus()],
        detail: detail ?? exception.message,
      });
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      type: `https://httpstatuses.com/${HttpStatus.INTERNAL_SERVER_ERROR}`,
      title: 'Internal Server Error',
      detail: 'An unknown error occurred.',
    });
  }
}
