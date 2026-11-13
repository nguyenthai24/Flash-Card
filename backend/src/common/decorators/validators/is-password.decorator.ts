import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPassword(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown): boolean {
          const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,128}$/;
          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage: () => 'Mật khẩu không hợp lệ',
      },
    });
  };
}
