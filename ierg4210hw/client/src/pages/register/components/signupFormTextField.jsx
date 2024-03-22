/* eslint-disable react/prop-types */

import { Field, useField } from "formik";
// import styles from '../../styles/LoginForm.module.css'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const SignupFormTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);

  const className = {
    iconActiveStyle: "text-primary-3 peer-focus:text-primary-3 h-8",
    iconIdleStyle: "text-primary-2 peer-focus:text-primary-3 h-8",

    remindTextStyle: "text-[12px] text-slate-400 ml-4 mt-1",
    warningTextStyle: "text-[12px] text-red-500 ml-4 mt-1",
  }

  const matchIconAndField = () => {
    switch(placeholder) {
      case 'Email':
        return <AlternateEmailIcon className={meta.value ? className.iconActiveStyle : className.iconIdleStyle} />
      case 'Password':
      case 'Confirm password':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.85} stroke="currentColor" className={`${meta.value ? className.iconActiveStyle : className.iconIdleStyle} w-7 h-7 hover:cursor-pointer`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
          </svg>
        )
      case 'Username':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.85} stroke="currentColor" className={`${meta.value ? className.iconActiveStyle : className.iconIdleStyle} w-7 h-7 hover:cursor-pointer`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        )
    }
  }

  return (
    <div>
        <div className="flex items-center border-[1.5px] rounded-full py-1 px-4 peer-focus:border-primary-3">
          <Field {...field} {...props} placeholder={placeholder} className='h-8 bg-transparent focus:outline-none w-full peer placeholder:text-[0.85rem]'/>
          {matchIconAndField(placeholder)}
        </div>
        {placeholder === 'Password' && !meta.error && (
          <p className={className.remindTextStyle}>The password must be at least 6 characters</p>
        )}
        {meta.touched && meta.error && (
          <p className={className.warningTextStyle}>{meta.error}</p>
        )}
    </div>
  );
};

export default SignupFormTextField;
