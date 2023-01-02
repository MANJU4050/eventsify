import * as Yup from "yup";
export const loginValidation = Yup.object({

email: Yup.string().email().required("Please enter your email"),

password: Yup.string().min(6).required("Please enter your password")
  .min(8,'Password too short should be 8 minimum')
  .matches(/[a-zA-Z]/,'Password can only contain Latin Letters.'),

})