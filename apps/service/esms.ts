import { eSMSConfig } from "@root/apps/shared/eSMS";
import { BaseService, ThirdPartyResponse } from ".";

export class ESMSService extends BaseService {
  private readonly host: string;
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor() {
    super();
    this.host = eSMSConfig.HOST;
    this.apiKey = eSMSConfig.API_KEY;
    this.secretKey = eSMSConfig.SECRET_KEY;
  }

  async sendOTP(
    phoneNumber: string,
    content: string
  ): Promise<ThirdPartyResponse<boolean>> {
    try {
      const response = { phoneNumber, content };
      return await this.handleResponse(response);
    } catch (e) {
      return await this.handleError(e);
    }
  }
}
