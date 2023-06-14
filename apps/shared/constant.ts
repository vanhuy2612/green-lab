import Env from "@root/libs/Env";

export const THROTTLE_TTL = parseInt(process.env.THROTTLE_TTL) || 10;
export const THROTTLE_LIMIT = parseInt(process.env.THROTTLE_LIMIT) || 10;
export const OTP_EXPIRE_IN = 5 * 60; // 5 minutes
export const PAGE_DEFAULT = 1;
export const PAGE_SIZE_DEFAULT = 20;
export const GLOBAL_PREFIX = Env.get("GLOBAL_PREFIX", "api");
export const SUB_DOMAIN = Env.get("SUB_DOMAIN", "");
