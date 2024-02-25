/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useField } from 'formik'
import { TextField } from '@mui/material';

const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    // console.log(meta, "<-- meta");
    // console.log(field, "<-- field");

    return (
        <TextField
            {...field}
            label={label}
            // variant="outlined"
            className='addProduct_form_input'
        />
    )
}

export default CustomInput