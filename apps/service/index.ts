export class BaseService {
  async handleResponse<T>(response: any): Promise<ThirdPartyResponse<T>> {
    const data = response.data;
    console.log(data);
    return {
      error: null,
      data: data as T,
    };
  }

  async handleError<T>(e: any): Promise<ThirdPartyResponse<T>> {
    console.log(e);
    return {
      error: e,
      data: null,
    };
  }
}

export type ThirdPartyResponse<T> = {
  error: any;
  data: T;
};

export type SendOTPResponse = {
  CodeResult?: string,
  CountRegenerate?: number,
  SMSID?: string,

  ErrorMessage?: string,
}