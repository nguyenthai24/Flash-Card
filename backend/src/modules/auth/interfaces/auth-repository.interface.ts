import { UserRole } from '@/common/shares/enums';

export interface AuthSessionRecord {
  id: string;
  tokenHash: string;
  expiresAt: Date;
  rememberMe?: boolean;
}

export interface OAuthAccountRecord {
  provider: 'google' | 'facebook' | 'github';
  providerId: string;
}

export interface AuthUserRecord {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  password?: string;
  avatar?: string;
  role: UserRole;
  email_verified_at?: Date | null;
  verification_token_hash?: string;
  verification_token_expires_at?: Date;
  password_reset_token_hash?: string;
  password_reset_token_expires_at?: Date;
  refresh_sessions: AuthSessionRecord[];
  failed_login_attempts: number;
  locked_until?: Date | null;
  token_version: number;
  oauth_accounts: OAuthAccountRecord[];
}

export interface CreateAuthUserData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  password?: string;
  avatar?: string;
  email_verified_at?: Date;
  oauth_accounts?: OAuthAccountRecord[];
}

export type AuthUserUpdate = Partial<
  Omit<AuthUserRecord, 'id' | 'email' | 'username' | 'role'>
>;

export interface IAuthRepository {
  findById(id: string): Promise<AuthUserRecord | null>;
  findByEmail(email: string): Promise<AuthUserRecord | null>;
  findByUsername(username: string): Promise<AuthUserRecord | null>;
  findByOAuthAccount(
    provider: OAuthAccountRecord['provider'],
    providerId: string,
  ): Promise<AuthUserRecord | null>;
  create(data: CreateAuthUserData): Promise<AuthUserRecord>;
  update(id: string, data: AuthUserUpdate): Promise<AuthUserRecord | null>;
  consumeVerificationToken(hash: string, verifiedAt: Date): Promise<boolean>;
  consumePasswordResetToken(
    hash: string,
    password: string,
    consumedAt: Date,
  ): Promise<boolean>;
}
