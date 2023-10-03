import "./logIn.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// import { useState } from "react";

const Verify = (email) => {
  const navigate = useNavigate();

  // console.log(email.email);
  const [unCorrectCode, setUnCorrectCode] = useState(true);

  const formik = useFormik({
    initialValues: {
      verifyCode: "",
      email,
    },
    validationSchema: Yup.object({
      verifyCode: Yup.string().min(4).max(4).required("verifyCode Required"),
    }),
    onSubmit: async (values) => {
      /* fetch data here*/

      try {
        let url = "auth/verify-code";
        const res = await axios.post(`/${url}`, {
          email: email.email,
          verify_code: values.verifyCode,
        });

        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("fname", res.data.user.fname);
         
        res.data.access_token && res.data.user.fname
          ? navigate("/")
          : navigate("/CompleteInfo");


      } catch (error) {
          
        error.message === "Network Error" ? console.log("server don't respond") : setUnCorrectCode(false);
      }
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h1 className="form-title">Log In</h1>

      <div className="form-div">
        <input
          placeholder=" "
          className="form-input"
          type="text"
          id="verifyCode"
          name="verifyCode"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.verifyCode}
        />
        <label htmlFor="" className="form-label">
          {" "}
          {formik.touched.verifyCode && formik.errors.verifyCode ? (
            <p style={{ color: "#f00", fontSize: "15px", lineHeight: 0.01 }}>
              {formik.errors.verifyCode}
            </p>
          ) : unCorrectCode ? (
            "Put the verifyCode"
          ) : (
            <p
              style={{
                color: "#f00",
                fontSize: "12px",
                backgroundColor: "#eee",
                lineHeight: 0.01,
              }}
            >
              unCorrectCode
            </p>
          )}
        </label>
      </div>
      <button type="submit" className="form-button">
        Verify
      </button>
    </form>
  );
};

export default Verify;
