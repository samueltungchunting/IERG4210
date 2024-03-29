import { useEffect, useState, useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import { loginFormValidationSchema } from "./components/ValidationSchema";
import LoginFormTextField from "./components/loginFormTextField";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

const Login = () => {
  const [loginFail, setLoginFail] = useState(false);
  const [csrfToken, setCSRFToken] = useState("");

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios.get('/auth/get_csrfToken').then((res) => {
      setCSRFToken(res.data.csrfToken);
    });
  }, [])

  if (user) {
    // console.log("User is already logged in", user);
    if(user.role === 'admin') {
      return <Navigate to="/view-products" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  const loginFormInitialValue = {
    email: "",
    password: "",
  };

  const onLoginFormSubmit = async (values) => {
    values._csrf = csrfToken;
    // console.log(values);
    try {
      const res = await axios.post("/auth/login", values);
      if (res.status === 200) {
        axios.get('/auth/get_user_profile').then(({data}) => {
          setUser(data)
        })

        return;
      }
    } catch (error) {
        // console.log(error);
        setLoginFail(true);
    }
  };

  const handleForgotPassword = async () => {
    console.log("Inside handleForgotPassword function");
  };

  const handleClose = () => {
    setLoginFail(false)
  }

  return (
    <>
      <nav className="inline-flex items-center justify-end py-4 pr-6 pl-8 w-full">
        <Link
          to={"/register"}
          className="bg-secondary border-2 border-primary px-3 py-2 rounded-full grid place-content-center font-[500] bg-blue-400 text-white"
        >
          <span className="text-[12px]">Sign up for free</span>
        </Link>
      </nav>
      <div className="grid place-items-center relative">
        <div className="max-w-[28rem] w-full px-8 py-8 flex flex-col">
          <h4 className="text-center mb-8 text-[32px] font-[600]">Sign in</h4>
          <Formik
            initialValues={loginFormInitialValue}
            validationSchema={loginFormValidationSchema}
            onSubmit={(values) => onLoginFormSubmit(values)}
          >
            {() => (
              <Form className="flex flex-col gap-2 mt-4">
                <div>
                  <small className="font-[400] mb-4">Your account</small>
                  <LoginFormTextField
                    placeholder="Email"
                    name="email"
                    type="email"
                  />
                </div>
                <LoginFormTextField
                  placeholder="Password"
                  name="password"
                  type="password"
                />
                <div className="text-end">
                  <span
                    className="text-slate-400 text-sm hover:text-primary-3 hover:cursor-pointer transition-colors"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-secondary py-2 px-3 rounded-full w-full mt-2 h-12 transition-colors text-gray-800"
                >
                  Login
                </button>
                <div className="text-[12px] flex flex-col items-center mt-2">
                  <div className="inline-flex">
                    <p>Don&apos;t have an account?</p>
                    <Link
                      to={"/register"}
                      className="text-secondary-2 hover:no-underline hover:cursor-pointer transition-colors underline ml-1"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Snackbar
          open={loginFail}
          autoHideDuration={3500}
          onClose={handleClose}
          className="fixed bottom-4 left-4"
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            Incorrect email or password
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default Login;
