import * as Yup from "yup";

export const addProductValidationSchema = Yup.object().shape({
  category: Yup
    .string()
    .required('Category is required'),
  name: Yup
    .string()
    .required('Name is required'),
  price: Yup
    .number()
    .required('Price is required')
    .min(0, 'Price must be a positive number'),
  photo: Yup.mixed(),
  description: Yup.string()
    .required('Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  stock: Yup.number()
    .required('Stock is required')
    .min(0, 'Stock must be a positive number')
    .integer('Stock must be an integer'),
});
