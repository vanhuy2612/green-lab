import Env from "@root/libs/Env";

export const authConfig = {
    JWT_SECRET_KEY: Env.get("SECRET_KEY", "2wsjLSopTjD6WQEztTYIZgCFou8wpLJn"),
    JWT_ACCESS_TOKEN_EXPIRE_IN: 24 * 60 * 60, // 1 day
    JWT_REFRESH_TOKEN_EXPIRE_IN: 30 * 24 * 60 * 60, // 30 days
}