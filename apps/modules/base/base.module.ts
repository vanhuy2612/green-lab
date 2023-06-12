import { Module } from "@nestjs/common";
import { BaseService } from "./base.service";
import { UserModule } from "@root/apps/modules/user/user.module";
import { AuthModule } from "@root/apps/modules/auth/auth.module";
import { AreaModule } from "@root/apps/modules/area/area.module";

@Module({
  imports: [UserModule, AuthModule, AreaModule],
  controllers: [],
  providers: [BaseService],
  exports: [BaseService],
})
export class BaseModule {}
