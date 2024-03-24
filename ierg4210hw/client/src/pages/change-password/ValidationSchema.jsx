import * as Yup from "yup";

export const changePWFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Your password should be at least 6 characters")
    .required("Current Password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match with new password")
    .required("Confirm new password is required"),
});
