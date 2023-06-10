abstract class AbsESMSService {
    abstract sendOTP(): Promise<boolean>;
}

export class ESMSService extends AbsESMSService {
    async sendOTP () {
        return true;
    }
}
