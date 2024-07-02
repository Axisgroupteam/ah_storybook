import * as yup from "yup";
import { twMerge } from "tailwind-merge";

const getValidationSchema = (
  type: string,
  requiredMessage: string,
  isRequired?: boolean
) => {
  switch (type) {
    case "email":
      return isRequired
        ? yup
            .string()
            .email("Email must be a valid email")
            .required(requiredMessage)
        : yup.string().email("Email must be a valid email");
    case "number":
      return isRequired
        ? yup
            .number()
            .typeError("Value must be a number")
            .required(requiredMessage)
        : yup.number().typeError("Value must be a number");
    case "string":
    default:
      return isRequired ? yup.string().required(requiredMessage) : yup.string();
  }
};

const validateField = async (schema, value) => {
  try {
    await schema.validate(value);
    return "";
  } catch (err) {
    return err.message;
  }
};

export { getValidationSchema, validateField };
