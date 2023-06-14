import { NestFactory } from "@nestjs/core";
import { AppModule } from "@root/apps/modules/app.module";
import Env from "./Env";
import { CustomExceptionFilter } from "./core/exception/CustomExceptionFilter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoggerService } from "./core/logger/index.service";
import { ValidationPipe } from "@nestjs/common";
import { GLOBAL_PREFIX, SUB_DOMAIN } from "@root/apps/shared/constant";

class Server {
  async start() {
    const globalPrefix = SUB_DOMAIN
      ? `${SUB_DOMAIN.trim()}/${GLOBAL_PREFIX}`
      : GLOBAL_PREFIX;
    const globalPrefixDocs = SUB_DOMAIN ? `${SUB_DOMAIN.trim()}/docs` : "docs";

    const logger = new LoggerService();
    const port = Env.get("PORT", 3333);
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      allowedHeaders: "*",
      origin: "*",
    });
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix(globalPrefix);
    const config = new DocumentBuilder()
      .setTitle("Green Lab List APIs")
      .setDescription("Green Lab List APIs")
      .setVersion("1.0")
      .addTag("API")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    console.log(globalPrefix, globalPrefixDocs);
    SwaggerModule.setup(globalPrefixDocs, app, document);
    app.listen(port);
    logger.log("Server is running on port :", port);
  }
}

export default Server;
