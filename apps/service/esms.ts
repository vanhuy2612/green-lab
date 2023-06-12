import { eSMSConfig } from "@root/apps/shared/eSMS";
import { BaseService, SendOTPResponse, ThirdPartyResponse } from ".";
import axios from 'axios';
import { APIException } from "@root/libs/core/exception/APIException";
import { HttpStatus } from "@nestjs/common";

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
      const url = `${eSMSConfig.HOST}/SendMultipleMessage_V4_post_json`;
      const response = await axios.post(url, {
        ApiKey: eSMSConfig.API_KEY,
        Content: content,
        Phone: phoneNumber,
        SecretKey: eSMSConfig.SECRET_KEY,
        Brandname: eSMSConfig.BRAND_NAME,
        SmsType: "2",
        IsUnicode: 0,
        Sandbox: 0,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data: SendOTPResponse = await response.data;
      if (data.ErrorMessage) {
        throw new Error(JSON.stringify({
          ...data,
          phoneNumber,
        }));
      }
      return await this.handleResponse(response);
    } catch (e) {
      return await this.handleError(e);
    }
  }
}
