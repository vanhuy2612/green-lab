
import { 
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions 
} from 'class-validator';

export const isEmail = (email: string) => {
  if (!email) return false;
  const emailRex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRex.test(email);
};

export function IsEqualTo(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
      },

      defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${propertyName} must match ${relatedPropertyName} exactly`;
      },
    },
  });
};
}