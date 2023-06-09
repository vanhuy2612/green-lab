import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class RequestTransformPipe<T extends Type<any>>
  implements PipeTransform
{
  async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      console.log('Going here');
      return value;
    }

    const obj = plainToInstance(metatype, value);
    const errors = await validate(value);
    if (errors.length) {
      throw new BadRequestException(errors);
    }
    return obj;
  }
}
