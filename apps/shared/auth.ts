import Env from "@root/libs/Env";

export const authConfig = {
    JWT_SECRET_KEY: Env.get("SECRET_KEY", "2wsjLSopTjD6WQEztTYIZgCFou8wpLJn"),
    JWT_EXPIRE_IN: 24 * 60 * 60, // 1 day
}