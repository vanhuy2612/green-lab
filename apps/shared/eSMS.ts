import Env from "@root/libs/Env";

export const eSMSConfig = {
    HOST: Env.get('ESMS_HOST', ''),
    API_KEY: Env.get('ESMS_API_KEY', ''),
    SECRET_KEY: Env.get('ESMS_SECRET_KEY', ''),
    BRAND_NAME: Env.get('BRAND_NAME', ''),
}