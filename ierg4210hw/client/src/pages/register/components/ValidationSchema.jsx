import * as Yup from "yup";

export const signupFormValidationSchema = Yup.object().shape({
  username: Yup.string()
  .min(3, "Username should be at least 3 characters")
  .required("Username is required")
  .max(16, "Username should be less than 16 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  // CSRFToken: Yup.string(),
});
