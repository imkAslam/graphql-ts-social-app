import { ValidationError, validate } from "class-validator";

async function ValidateEntity(
  object: any
): Promise<{ isValid: boolean; errors: string[] }> {
  const errors: string[] = [];

  const validationErrors: ValidationError[] = await validate(object);

  if (validationErrors.length > 0) {
    validationErrors.forEach((error) => {
      const errObj: any = error?.constraints;
      const errorMessage = Object.values(errObj).join(", ");
      errors.push(errorMessage);
    });
  }
  return { isValid: errors.length === 0, errors };
}

export default ValidateEntity;
