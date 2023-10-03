import "./editprofile.css";
import Button from "react-bootstrap/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "../../Components/sections/NavBar";
import portrait from "../../assets/images/testimonial1.png";
import { ClipLoader } from "react-spinners";




const EditProfile = () => {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({});
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    async function getData() {
      const { data } = await axios.get(`/auth/me`, { headers });

      setUserInfo(data.data);
    }
    getData();
  }, [token, edit]);

  const formik = useFormik({
    initialValues: {
      Fname: "",
      Lname: "",
      Address: "",
      City: "",
      Phone: 9,
    },
    validationSchema: Yup.object({
      Fname: Yup.string().min(8).max(20),
      Lname: Yup.string(),
      Address: Yup.string().trim(),
      City: Yup.string().min(3),
      Phone: Yup.number().min(10),
    }),
    onSubmit: async (values) => {
      /* fetch data here*/

      let url = "user/edit";

      const data = {};

      values.Fname ? (data.fname = values.Fname) : null;
      values.Lname ? (data.lname = values.Lname) : null;
      values.Phone ? (data.phone = values.Phone) : null;

      console.log(Object.keys(data));
      try {
        if (Object.keys(data).length !== 0) {
          setLoading(true);
          const req = await axios.post(`/${url}`, data, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },

          });
          setLoading(false);
          console.log(req.data.success);

          req.data.success && setEdit(true);
        }
      } catch (error) {
        console.log(error.message);
        error.message && setLoading(false);
      }
    }, //end submit
  });

  const errorStyle = formik.errors.Fname ? { color: "#f00" } : {};
  const errorStyle2 = formik.errors.Phone ? { color: "#f00" } : {};
  const errorStyle3 = formik.errors.City ? { color: "#f00" } : {};

  return (
    <>
      <NavBar />

      <div className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="profile-card-4 z-depth-3">
                <div className="card">
                  <div className="card-body text-center bg-primary rounded-top">
                    <div className="user-box">
                      <img src={portrait} alt="" />
                    </div>
                    <h5 className="mb-1 text-white">
                      {userInfo.fname} {userInfo.lname}
                    </h5>
                    <h6 className="text-light">UI/UX Engineer</h6>
                  </div>
                  <div className="card-body">
                    <ul className="list-group shadow-none">
                      <li className="list-group-item">
                        <div className="list-icon">
                          <i className="fa fa-phone-square"></i>
                        </div>
                        <div className="list-details">
                          <span>{userInfo.phone}</span>
                          <small>Mobile Number</small>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="list-icon">
                          <i className="fa fa-envelope"></i>
                        </div>
                        <div className="list-details">
                          <span>{userInfo.email}</span>
                          <small>Email Address</small>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="list-icon">
                          <i className="fa fa-globe"></i>
                        </div>
                        <div className="list-details">
                          <span>
                            {userInfo.city} {userInfo.address}{" "}
                          </span>
                          <small> Address</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
           




     {/*  start form*/}

            <div className="col-lg-8">
              <div className="card z-depth-3 ">
                <div className="card-body">
                  <div className="tab-content p-3">
                    <div className="">
                   

                      <form onSubmit={formik.handleSubmit}>
                        <div className="form-group my-3 row">
                          <label
                            className="col-lg-3 col-form-label form-control-label"
                            style={errorStyle}
                          >
                            {formik.errors.Fname
                              ? formik.errors.Fname
                              : " First name"}
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              id="Fname"
                              name="Fname"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.Fname}
                            />
                          </div>
                        </div>
                        <div className="form-group my-3 row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Last name
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              id="Lname"
                              name="Lname"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.Lname}
                            />
                          </div>
                        </div>

                        <div className="form-group my-3 row">
                          <label className="col-lg-3 col-form-label form-control-label">
                            Address
                          </label>
                          <div className="col-lg-9">
                            <input
                              className="form-control"
                              type="text"
                              id="Address"
                              name="Address"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.Address}
                              placeholder="Street"
                            />
                          </div>
                        </div>

                        <div className="form-group my-3 row">
                          <label
                            className="col-lg-3 col-form-label form-control-label"
                            style={errorStyle3}
                          >
                            {formik.errors.City ? formik.errors.City : "City"}
                          </label>
                          <div className="col-lg-6">
                            <input
                              className="form-control"
                              type="text"
                              id="City"
                              name="City"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.City}
                              placeholder="City"
                            />
                          </div>
                        </div>

                        <div className="form-group my-3 row">
                          <label
                            className="col-lg-3 col-form-label form-control-label"
                            style={errorStyle2}
                          >
                            {formik.errors.Phone
                              ? formik.errors.Phone
                              : "Phone"}
                          </label>
                          <div className="col-lg-6">
                            <input
                              placeholder="Phone"
                              className="form-control"
                              type="text"
                              id="Phone"
                              name="Phone"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.Phone}
                            />
                          </div>
                        </div>

                        {/*   Buttons  */}

                        <div className="form-group my-3 row">
                          <label className="col-lg-3 col-form-label form-control-label"></label>
                          <div className="col-lg-9 justify-content-between align-content-center">
                            <Button
                              as="input"
                              value="Edit"
                              type="submit"
                              variant="outline-primary"
                              className="ms-2"
                            />

                            {edit && (
                             
                              <p
                                className="ms-3 d-inline-block"
                                style={{ color: "#029633" }}
                              >
                                edited successfully
                              </p>
                            )}

                            <ClipLoader
                              color={"rgba(45,162, 132,0.8)"}
                              loading={loading}
                              size={25}
                              className="ms-3"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default EditProfile;
