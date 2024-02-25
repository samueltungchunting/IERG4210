/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react';
import { useField } from 'formik';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const CustomTextarea = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            {/* <label htmlFor={props.id || props.name}>{label}</label> */}
            <textarea
                {...field}
                {...props}
                label={label}
                className='addProduct_form_textarea'
            />
            {/* {meta.touched && meta.error ? (
                <div style={{ color: 'red' }}>{meta.error}</div>
            ) : null} */}
        </div>
    );
};

export default CustomTextarea;