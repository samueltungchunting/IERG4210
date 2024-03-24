import { Field, Form, Formik } from "formik"
import { changePWFormValidationSchema } from "./ValidationSchema";
import axios from "axios";

const ChangePassword = () => {

    async function haneleChangePassword(values) {
        console.log(values)
        const csrfRes = await axios.get('/auth/get_csrfToken');
        const csrfToken = csrfRes.data.csrfToken;
        values._csrf = csrfToken;
        console.log('newVaues with token', values);
        try {
            const {data} = await axios.post('/auth/change_password', values)
            console.log('data', data);
            if(data) {
                alert('Password changed successfully')
                window.location.reload();
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong, please try again')
        }
    }

  return (
    <div>
        <small>Almost forgot this part, but time limited so ugly UI for now</small>

        <Formik
            initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: ""  
            }}
            onSubmit={(values) => {haneleChangePassword(values)}}
            validationSchema={changePWFormValidationSchema}
        >
            {() => (
                <Form className="flex flex-col gap-4 w-3/5 mx-auto mt-8">
                    <div>
                        <label htmlFor="currentPassword">Current Password</label>
                        <Field name="currentPassword" id="currentPassword">
                            {({ field, meta }) => (
                                <div>
                                    <input type="text" {...field} placeholder="Old Password" className=""/>
                                    {meta.touched &&
                                    meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <Field name="newPassword" id="newPassword">
                            {({ field, meta }) => (
                                <div>
                                    <input type="password" {...field} placeholder="New Password" className=""/>
                                    {meta.touched &&
                                    meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <Field name="confirmNewPassword" id="confirmNewPassword">
                            {({ field, meta }) => (
                                <div>
                                    <input type="password" {...field} placeholder="Confirm Password" className=""/>
                                    {meta.touched &&
                                    meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
                                </div>
                            )}
                        </Field>
                    </div>
                    <button type="submit" className="bg-green-200 py-2 px-4 rounded-lg">Change Password</button>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default ChangePassword