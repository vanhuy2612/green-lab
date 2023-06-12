import { NestFactory } from "@nestjs/core";
import { AppModule } from "@root/apps/modules/app.module";
import Env from "./Env";
import { CustomExceptionFilter } from "./core/exception/CustomExceptionFilter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoggerService } from "./core/logger/index.service";
import { ValidationPipe } from "@nestjs/common";

class Server {
  async start() {
    const logger = new LoggerService();
    const port = Env.get("PORT", 3333);
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("/api/v1");
    const config = new DocumentBuilder()
      .setTitle("Green Lab List APIs")
      .setDescription("Green Lab List APIs")
      .setVersion("1.0")
      .addTag("API")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
    app.listen(port);
    logger.log("Server is running on port :", port);
  }
}

export default Server;
