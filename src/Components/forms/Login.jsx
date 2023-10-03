import "./logIn.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import Verify from "./Verify";

const Login = () => {
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8).max(20).required("Password Required"),
      email: Yup.string().email("Invalid email").required("Email Required"),
    }),
    onSubmit: async (values) => {
      /* fetch data here*/

      let url = "auth/send-code";
   

try {
  const { data } = await axios.post(`/${url}`, {
    email: values.email,
  });
  setVerify(!verify);

  console.log(data, values, values.email);
} catch (error) {
  error.message === "Request failed with status code 500" ? setError("server Error") : setError("network error");
  console.log(error)
}

     

     
    },
  });

  return (
    <div className="form-1">
      {!verify ? (
        <form onSubmit={formik.handleSubmit} className="form">
          <h1 className="form-title">Log In</h1>

          <div className="form-div">
            <input
              placeholder=" "
              className="form-input"
              type="text"
              id="email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label htmlFor="" className="form-label">
              {" "}
              {formik.touched.email && formik.errors.email ? (
                <p
                  style={{ color: "#f00", fontSize: "13px", lineHeight: 0.01 }}
                >
                  {formik.errors.email}
                </p>
              ) : (
                "Email"
              )}{" "}
            </label>
          </div>

          <div className="form-div">
            <input
              placeholder=" "
              className="form-input"
              type="text"
              id="password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label htmlFor="password" className="form-label">
              {formik.touched.password && formik.errors.password ? (
                <p
                  style={{ color: "#f00", fontSize: "13px", lineHeight: 0.01 }}
                >
                  {formik.errors.password}
                </p>
              ) : (
                "Password"
              )}{" "}
            </label>
          </div>

          <button type="submit" className="form-button">
            Submit
          </button>

          <p
                  style={{ color: "#f00", fontSize: "16px", lineHeight: 0.01 }}
                >
                { error}
                </p>
        
        </form>
      
      ) : (
        <Verify email={formik.values.email} />
      )}
     
    
    </div>
  );
};

export default Login;
