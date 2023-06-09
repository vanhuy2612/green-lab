import { authConfig } from "@root/apps/shared/auth";
import * as bcrypt from 'bcrypt'
/**
 * Hash password
 * @param plainPassword
 * @param salt
 * @returns
 */
export const hash = async (
  plainPassword: string,
  salt: string
): Promise<string> => {
  return await bcrypt.hash(plainPassword + salt + authConfig.JWT_SECRET_KEY, 10);
};

/**
 * Verify password of user
 * @param plainPassword 
 * @param salt 
 * @param encryptedPassword 
 * @returns 
 */
export const compare = async (
  plainPassword: string,
  salt: string,
  encryptedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(
    plainPassword + salt + authConfig.JWT_SECRET_KEY,
    encryptedPassword
  );
};
