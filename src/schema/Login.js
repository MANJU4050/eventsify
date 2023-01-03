import * as Yup from "yup";
export const loginValidation = Yup.object({

email: Yup.string().email().required("Email Required!"),

password: Yup.string().min(6).required("Password Required!")
  .min(8,'Password too short')
  .matches(/[a-zA-Z0-9]/,'Password should be alphanumberic'),

})