import { Field, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"

const LoginFormSchema = Yup.object().shape({
  login: Yup.string().required().max(16).min(3),
  password: Yup.string().required().max(16).min(3),
})

const Login: React.FC = () => {
  const handleSubmit = () => {}

  return (
    <div>
      <Formik
        initialValues={{ login: "", password: "" }}
        validationSchema={LoginFormSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="login" placeholder="Login" type="text" />
          <Field name="password" placeholder="Password" type="password" />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
