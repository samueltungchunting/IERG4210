/* eslint-disable react/prop-types */
import { Field, Form, Formik } from "formik";
import { useEffect, useState, useContext } from "react";
import SignupFormTextField from "./components/signupFormTextField";
import { signupFormValidationSchema } from "./components/ValidationSchema";
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Register = () => {
  const style = { boxShadow: "0px 0px 12px 2px rgba(0,0,0,0.1)" };
  const [isRegisterFail, setIsRegisterFail] = useState(false);
  const [CSRFToken, setCSRFToken] = useState("");
  const [isSucess, setIsSucess] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get('/auth/get_csrfToken').then((res) => {
      // console.log(res.data.csrfToken);
      setCSRFToken(res.data.csrfToken);
    });
  }, []);

  if (user) {
    console.log("User is already logged in", user);
    if(user.role === 'admin') {
      return <Navigate to="/view-products" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  if(isSucess) return <Navigate to="/login" />;

  const handleRegisterFormSubmit = async (value) => {
    value._csrf = CSRFToken
    // console.log(value);
    const res = await axios.post("/auth/register", value);
    console.log(res);
    if (res.status === 200) {
      alert("Register success");
      setTimeout(() => {
        setIsSucess(true);
      }, 1000);
    }
    // console.log(res.data, new added user);
  };

  const handleClose = () => {
    setIsRegisterFail(false);
  };

  const registerFormInitialValue = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div>
      <nav className="inline-flex items-center justify-end py-4 pr-6 pl-8 w-full">
        <Link
            to={"/login"}
            className="bg-secondary border-2 border-primary px-3 py-2 rounded-full grid place-content-center font-[500] bg-blue-400 text-white"
            >
            <span className="text-[12px]">Sign up for free</span>
            </Link>
      </nav>
      <div className="grid place-items-center px-6 relative">
        <div
          className="max-w-[28rem] w-full px-8 py-16 flex flex-col justify-start rounded-2xl bg-white"
          style={style}
        >
          <h4 className="text-[32px] font-[600] text-center mb-8">
            Sign up for Learnify
          </h4>
          <Formik
            initialValues={registerFormInitialValue}
            onSubmit={(values) => handleRegisterFormSubmit(values)}
            validationSchema={signupFormValidationSchema}
          >
            {(props) => (
              <Form className="flex flex-col gap-2">
                {/* {console.log(props.dirty, props.isValid)} */}
                <SignupFormTextField
                  placeholder="Username"
                  name="username"
                  type="text"
                />
                <SignupFormTextField
                  placeholder="Email"
                  name="email"
                  type="email"
                />
                <SignupFormTextField
                  placeholder="Password"
                  name="password"
                  type="password"
                />
                <SignupFormTextField
                  placeholder="Confirm password"
                  name="confirmPassword"
                  type="password"
                />
                <Field type="hidden" name="CSRFToken" value={CSRFToken} />
                <button
                  type="submit"
                  className={`${
                    props.dirty && props.isValid
                      ? "bg-secondary text-gray-800"
                      : "bg-gray-100 text-gray-400 cursor-default"
                  } py-2 px-3 rounded-full w-full mt-2 h-12 transition-colors`}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <p className="pt-8">
          Already have an account?
          <Link to={"/login"} className="underline text-secondary-2 ml-1">
            Sign in
          </Link>
        </p>
        <Snackbar
          open={isRegisterFail}
          autoHideDuration={4000}
          onClose={handleClose}
          className="fixed bottom-4 left-4 z-50"
        >
          <Alert
            severity="warning"
            variant="filled"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            Can not register, please try again
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Register;
