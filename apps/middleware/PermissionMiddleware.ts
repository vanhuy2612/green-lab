import { NextFunction } from 'express';
import { APIException } from '@root/libs/core/exception/APIException';
import { HttpStatus } from '@nestjs/common';
import { ErrorMessageKey } from '@root/libs/core/exception/lang';

export const PermissionMiddleware = (permission: string) => {
  return (req: any, res: any, next: NextFunction) => {
    const auth: any = req.auth;
    const permissions: string[] = auth.permissions || [];
    if (!permissions.includes(permission)) {
      throw new APIException(
        HttpStatus.FORBIDDEN,
        ErrorMessageKey.PERMISSION_DENIED,
      );
    }
    next();
  };
};
