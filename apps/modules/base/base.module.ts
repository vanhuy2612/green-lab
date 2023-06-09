import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserModule } from '@root/apps/modules/user/user.module';
import { AuthModule } from '@root/apps/modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule ],
  controllers: [],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
