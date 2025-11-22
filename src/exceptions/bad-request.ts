import { BadRequestException as NestException } from '@nestjs/common';
import { JsonApiResponse } from 'src/response/json-api';

export class BadRequestException extends NestException {
  constructor(msg?: string) {
    super(
      new JsonApiResponse({
        data: {
          message: msg ?? 'Bad Request',
        },
      }).toJSON(),
    );
  }
}
