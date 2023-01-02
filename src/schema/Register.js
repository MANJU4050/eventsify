import * as Yup from "yup";

export const registerValidation = Yup.object({

  firstname:Yup.string()
  .max(15,'Must be 15 Characters or Less')
  .min(5,'Minumum five letters required')
  .required('First name required'),

  lastname:Yup.string()
  .max(15,'Must be 15 Characters or Less')
  .min(1,'Minumum one letter required')
  .required('Last name required'),

  email: Yup.string().email().required("Please enter your email"),
  
  password: Yup.string().min(6).required("Please enter your password")
  .min(8,'Password too short should be 8 minimum')
  .matches(/[a-zA-Z0-9]/,'Password can only contain Latin Letters.'),

  place:Yup.string()
  .max(15,'Must be 15 Characters or Less')
  .min(5,'Minumum five lettes required')
  .required('place required'),
  
})