import { Module } from "@nestjs/common";
import { BaseModule } from "./base/base.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@root/libs/core/database/index.module";
import { LoggerModule } from "@root/libs/core/logger/index.module";
import { JwtModule } from "@nestjs/jwt";
import { EventEmitterModule } from "@nestjs/event-emitter";

import Env from "@root/libs/Env";
import { THROTTLE_LIMIT, THROTTLE_TTL } from "../shared/constant";
import { ThrottlerModule } from "@nestjs/throttler";

ConfigModule.forRoot();
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: THROTTLE_TTL,
      limit: THROTTLE_LIMIT,
    }),
    BaseModule,
    PrismaModule,
    LoggerModule,
    JwtModule.register({
      secret: Env.get("JWT_SECRET", "nguoianhmuonquen"),
      signOptions: { expiresIn: "120s" },
    }),
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: ".",
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  controllers: [],
  providers: [],
})

// export class AppModule {

// }
export class AppModule {}
