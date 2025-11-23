import { NotFoundException as NestException } from '@nestjs/common';
import { JsonApiResponse } from 'src/response/json-api';

export class NotFoundException extends NestException {
  constructor(msg?: string) {
    super(
      new JsonApiResponse({
        data: {
          message: msg ?? 'Not found',
        },
      }).toJSON(),
    );
  }
}
