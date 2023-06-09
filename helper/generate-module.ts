import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const keyword = {
  help: ['-h', '--help'],
  name: ['-n', '--name'],
  force: ['-f', '--force'],
};

const alertSyntax = (type: string) => {
  if (type == 'name') {
    console.log(
      chalk.red(
        `
            Module name is invalid.
            Please try again. Command: yarn gen:module --name <module_name> or -n <module_name>
            `,
      ),
    );
  }
};

const alertGuide = () => {
  console.log(
    chalk.gray(
      `Generate Module Help:
      Syntax:
      yarn gen:module <option> <value> <option> <value> ...
      options:  
        -h, --help: Guide,
        -n, --name: Name of Module,
        -f, --force: Force process
      `,
    ),
  );
};

const isKeyword = (word: string): string => {
  for (const key in keyword) {
    const idx: number = keyword[key].indexOf(word);
    if (idx > -1) return key;
  }
  return null;
};

const validateCommandValue = (name: string) => {
  const isValid: boolean = /^[a-zA-Z][a-zA-Z0-9_-]+$/gi.test(name);
  if (!isValid) {
    console.log(
      chalk.red(
        `The value "${name}" is invalid, it only has a-z, A-Z, 0-9, _ or - character.`,
      ),
    );
    process.exit(2);
  }
  return true;
};

const parseCommand = (args: string[]) => {
  let name = '';
  let isForce = false;
  if (args.length < 3) {
    alertGuide();
    process.exit(0);
  }
  for (let i = 0; i < args.length; i++) {
    const word = args[i];
    const key: string = isKeyword(word);
    if (key == 'help') {
      alertGuide();
      process.exit(0);
    } else if (key == 'name') {
      const nextWord = args[i + 1];
      if (nextWord && !isKeyword(nextWord)) {
        validateCommandValue(nextWord);
        name = nextWord;
      } else {
        alertSyntax(key);
        process.exit(1);
      }
    } else if (key == 'force') {
      isForce = true;
    } else {
    }
  }

  return {
    name: name.toLowerCase(),
    isForce,
  };
};

const isModuleExist = (moduleName: string) => {
  const modulePath = path.resolve(`${__dirname}/../apps/modules/${moduleName}`);
  if (fs.existsSync(modulePath)) {
    console.log(chalk.yellow(`The module "${moduleName}" is already exist.`));
    return true;
  }
  return false;
};

const upperCaseFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.toLowerCase().substring(1);
};

const createModuleFile = (moduleName: string) => {
  try {
    const upperModuleName = upperCaseFirstLetter(moduleName);
    const modulePath = path.resolve(
      `${__dirname}/../apps/modules/${moduleName}/${moduleName}.module.ts`,
    );
    const content = `
    import { Module } from '@nestjs/common';
    import { ${upperModuleName}Controller } from './${moduleName}.controller';
    import { ${upperModuleName}Service } from './${moduleName}.service';
    import { JwtService } from '@nestjs/jwt';
    @Module({
      imports: [],
      controllers: [${upperModuleName}Controller],
      providers: [${upperModuleName}Service, JwtService],
    })
    export class ${upperModuleName}Module {}
    `;
    fs.appendFileSync(modulePath, content);
  } catch (e) {}
};

const createControllerFile = (moduleName: string) => {
  try {
    const upperModuleName = upperCaseFirstLetter(moduleName);
    const modulePath = path.resolve(
      `${__dirname}/../apps/modules/${moduleName}/${moduleName}.controller.ts`,
    );
    const content = `
    import { Controller } from '@nestjs/common';
    import { ${upperModuleName}Service } from './${moduleName}.service';
    import { ApiTags } from '@nestjs/swagger';

    @ApiTags('${moduleName}')
    @Controller('${moduleName}')
    export class ${upperModuleName}Controller {
      constructor(private readonly ${moduleName}Service: ${upperModuleName}Service) {}
    }
    `;
    fs.appendFileSync(modulePath, content);
  } catch (e) {}
};

const createServiceFile = (moduleName) => {
  try {
    const upperModuleName = upperCaseFirstLetter(moduleName);
    const modulePath = path.resolve(
      `${__dirname}/../apps/modules/${moduleName}/${moduleName}.service.ts`,
    );
    const content = `
    import { Injectable } from '@nestjs/common';
    import { BaseService } from '../base/base.service';
    import { PrismaService } from '@root/libs/core/database/index.service';
    import { LoggerService } from '@root/libs/core/logger/index.service';
    import { QueueService } from '@root/apps/queue/index.service';
    import { JwtService } from '@nestjs/jwt';
    import { EventEmitter2 } from '@nestjs/event-emitter';

    @Injectable()
    export class ${upperModuleName}Service extends BaseService {
      constructor(
        readonly prismaService: PrismaService,
        readonly logger: LoggerService,
        readonly queueService: QueueService,
        readonly jwtService: JwtService,
        readonly eventEmitter: EventEmitter2,
      ) {
        super(prismaService, logger, queueService, jwtService, eventEmitter);
      }
    }
    `;
    fs.appendFileSync(modulePath, content);
  } catch (e) {}
};

const createUnitTestFile = (moduleName: string) => {
  try {
    const upperModuleName = upperCaseFirstLetter(moduleName);
    const modulePath = path.resolve(
      `${__dirname}/../apps/modules/${moduleName}/${moduleName}.controller.spec.ts`,
    );
    const content = `
    import { Test, TestingModule } from '@nestjs/testing';
    import { ${upperModuleName}Controller } from './${moduleName}.controller';
    import { ${upperModuleName}Service } from './${moduleName}.service';

    describe('${upperModuleName}Controller', () => {
      let ${moduleName}Controller: ${upperModuleName}Controller;

      beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
          controllers: [${upperModuleName}Controller],
          providers: [${upperModuleName}Service],
        }).compile();

        ${moduleName}Controller = app.get<${upperModuleName}Controller>(${upperModuleName}Controller);
      });

      describe('root', () => {
        it('should return "Hello World!"', () => {
          expect(true).toBe(true);
        });
      });
    });
    `;
    fs.appendFileSync(modulePath, content);
  } catch (e) {}
};

const generateModule = (moduleName: string, delExistModule: boolean) => {
  const modulePath = path.resolve(`${__dirname}/../apps/modules/${moduleName}`);
  console.log('modulePath', modulePath);
  if (delExistModule) {
    try {
      fs.rmSync(modulePath, { recursive: true, force: true });
    } catch (e) {
      console.log(e);
      console.log(chalk.red(`Delete module fail.`));
      process.exit(4);
    }
  }
  try {
    fs.mkdirSync(modulePath);
  } catch (e) {
    console.log(chalk.red(`Mkdir module fail.`));
    process.exit(4);
  }
  createModuleFile(moduleName);
  createControllerFile(moduleName);
  createServiceFile(moduleName);
  createUnitTestFile(moduleName);
};

const exec = () => {
  const info = parseCommand(process.argv);
  console.log(info);
  const isExist: boolean = isModuleExist(info.name);
  if (isExist && !info.isForce) {
    process.exit(3);
  }
  console.log(chalk.white(`Creating "${info.name}" module ...`));
  generateModule(info.name, isExist);
  console.log(chalk.green(`Creating "${info.name}" module is successfully`));
};

exec();
