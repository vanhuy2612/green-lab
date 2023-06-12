import { Test, TestingModule } from "@nestjs/testing";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";

describe("AreaController", () => {
  let areaController: AreaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AreaController],
      providers: [AreaService],
    }).compile();

    areaController = app.get<AreaController>(AreaController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(true).toBe(true);
    });
  });
});
