/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useField } from 'formik'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CustomSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    // console.log(meta, "<-- meta");

    return (
        // <div className='customSelect'>
        <FormControl fullWidth>
            <InputLabel key={field.name}>{props.placeholder}</InputLabel>
            <Select
                {...field}
                label={label}
                fullWidth
            >
                {props.children}
            </Select>
        </FormControl>
        // </div>
    )
}

export default CustomSelect