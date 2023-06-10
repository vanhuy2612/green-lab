export class BaseService {
  async handleResponse<T>(response: any): Promise<ThirdPartyResponse<T>> {
    const data = await response.json();
    return {
      error: null,
      data: data.data as T,
    };
  }

  async handleError<T>(e: any): Promise<ThirdPartyResponse<T>> {
    return {
      error: true,
      data: null,
    };
  }
}

export type ThirdPartyResponse<T> = {
  error: any;
  data: T;
};
