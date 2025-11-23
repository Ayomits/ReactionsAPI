import { ForbiddenException as NestException } from '@nestjs/common';
import { JsonApiResponse } from 'src/response/json-api';

export class ForbiddenException extends NestException {
  constructor(msg?: string) {
    super(
      new JsonApiResponse({
        data: {
          message: msg ?? 'Access denied',
        },
      }).toJSON(),
    );
  }
}
