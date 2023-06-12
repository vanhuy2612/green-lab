import { Module } from "@nestjs/common";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { JwtService } from "@nestjs/jwt";
@Module({
  imports: [],
  controllers: [AreaController],
  providers: [AreaService, JwtService],
})
export class AreaModule {}
