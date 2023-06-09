import { Global, Module } from '@nestjs/common';
import { LoggerService } from './index.service';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
