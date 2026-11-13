import 'reflect-metadata';
import { UserSchema } from './user.schemas';

describe('UserSchema', () => {
  it('defines nullable authentication dates as Date fields', () => {
    const emailVerifiedAt = UserSchema.path('email_verified_at');
    const lockedUntil = UserSchema.path('locked_until');

    expect(emailVerifiedAt.instance).toBe('Date');
    expect(emailVerifiedAt.options.default).toBeNull();
    expect(lockedUntil.instance).toBe('Date');
    expect(lockedUntil.options.default).toBeNull();
    expect(lockedUntil.options.select).toBe(false);
  });
});
