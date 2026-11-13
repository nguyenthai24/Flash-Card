import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPhoneNumber(options?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value?: unknown): boolean {
          if (value === undefined || value === null) return true; // allow optional values
          const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

          return typeof value === 'string' && regex.test(value);
        },
        defaultMessage: () => 'Số điện thoại không hợp lệ',
      },
    });
  };
}
