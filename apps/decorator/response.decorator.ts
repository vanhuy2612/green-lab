import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ExceptionResponse, PaginatedResponse } from '@root/apps/dto/response';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponse),
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const CustomApiOKResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(model),
      },
    }),
  );
};

export const ApiExceptionResponse = () => {
  return applyDecorators(
    ApiExtraModels(ExceptionResponse),
    ApiBadRequestResponse({
      schema: {
        $ref: getSchemaPath(ExceptionResponse),
      },
    }),
  );
};
