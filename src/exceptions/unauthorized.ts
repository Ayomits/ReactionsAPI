import { UnauthorizedException as NestException } from '@nestjs/common';
import { JsonApiResponse } from 'src/response/json-api';

export class UnauthorizedException extends NestException {
  constructor(msg?: string) {
    super(
      new JsonApiResponse({
        data: {
          message: msg ?? 'Unauthorized',
        },
      }).toJSON(),
    );
  }
}
