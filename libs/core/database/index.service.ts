import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { URLSearchParams } from "url";
import { exec } from "child_process";
import { cwd } from "process";

type DBConfig = {
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;

  query:
    | {
        [key in string]: string;
      }
    | undefined;
};
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log("************ Database connected ******************");
    this.$use(this.paginationMiddleware);
    if (process.env.NODE_ENV !== "development") {
      exec(
        `sh ${cwd()}/libs/core/database/bash.sh`,
        function (err, stdout, stderr) {
          if (err) {
            console.log(err);
          } else {
            console.log("Migrate DB done...");
          }
        }
      );
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }

  async paginationMiddleware(params: Prisma.MiddlewareParams, next) {
    return next(params);
  }

  async getExtConnection(config: DBConfig) {
    const url = `${config.DB_TYPE}://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
    const query: string = new URLSearchParams(config.query || {}).toString();
    return new PrismaClient({
      datasources: {
        db: {
          url: `${url}?${query}`,
        },
      },
    });
  }
}
