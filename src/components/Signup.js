import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 
const Signup = ({setSignupData}) => {
    const initialValues = {
        name: "",
        email: "",
        password: "",
      };
      const navigate = useNavigate(); 
      const validationSchema = Yup.object({
        name: Yup.string()
          .required("Name is required")
          .min(2, "Name must be at least 2 characters"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
    
      const onSubmit = (values) => {
        setSignupData(values); // Save signup data
        alert("Signup successful!");
         // Switch to login mode after successful signup
         navigate("/Login")
      };
    
      return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <h2>Signup</h2>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form style={{width:"100px"}}>
              <div>
                <label htmlFor="name">Name:</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
    
              <div>
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
    
              <div>
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password"  style={{marginBottom:"5px"}} />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
    
              <button type="submit">Signup</button>
            </Form>
          </Formik>
          <p>already have an account?</p>
          <button onClick={()=>navigate("/Login")}>Switch to Login</button>
        </div>
      );
}

export default Signup