import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one numeric value'
      ),
  });



  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: values.email,
        password: values.password,
      });
      // Handle successful login

      // Store token in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.userName);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('email', response.data.email);
      window.alert("You have Logged In Successfully");

      // Redirect to dashboard or any other protected route
      window.location.href = '/dashboard';
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
      window.alert(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 align-items-center mt-5">
          <h2>Login</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" className="form-control" id="email" name="email" required />
                <ErrorMessage name="email" component="div" className="alert" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" className="form-control" id="password" name="password" required />
                <ErrorMessage name="password" component="div" className="alert" />
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </Form>
          </Formik>
          <div className="d-flex mt-3">
            <p>Don't have an account yet? </p>
            <Link to="/signup" className="ms-3 text-decoration-none">
              <p>Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
