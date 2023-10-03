
import "./logIn.css"
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CompleteInfo = () => {
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
    
        Fname: "",
        Lname: "",
        phone: undefined,
      },
      validationSchema: Yup.object({
     
        Fname: Yup.string().min(8).max(20).required("Fname Required"),
        Lname: Yup.string().required("Lname Required"),
        phone: Yup.number().required()
      }),
      onSubmit: async  (values) => {
          /* fetch data here*/
           const token = localStorage.getItem("token");
         let url = "user/complate-info";



          const req =  await axios.post(`/${url}` , {
            fname : values.Fname,
            lname : values.Lname,
            phone : values.phone, } , 
             {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`,
                }
              }   
            );
            req.data &&  navigate("/") ;
        console.log(req,values,values.Lname);
      },
    });
    

  return (
    <>
    
    <div className="form-1">     
   
      <form onSubmit={formik.handleSubmit} className="form">
       <h1 className="form-title">Compleat Info</h1>
     
     <div className="form-div">
     <input
       placeholder=" "
       className="form-input"
       type="text"
       id="Fname"
       name="Fname"
       onBlur={formik.handleBlur}
       onChange={formik.handleChange}
       value={formik.values.Fname}
     />
     <label htmlFor="Fname" className="form-label"> {formik.touched.Fname && formik.errors.Fname ? (
       <p style={{color: "#f00", fontSize:"13px", lineHeight: 0.01}}>{formik.errors.Fname}</p>
     ) : "Fname"} </label>
   
     </div> 

     <div className="form-div">
     <input
       placeholder=" "
       className="form-input"
       type="text"
       id="Lname"
       name="Lname"
       onBlur={formik.handleBlur}
       onChange={formik.handleChange}
       value={formik.values.Lname}
     />
     <label htmlFor="Lname" className="form-label"> {formik.touched.Lname && formik.errors.Lname ? (
       <p style={{color: "#f00", fontSize:"13px", lineHeight: 0.01}}>{formik.errors.Lname}</p>
     ) : "Lname"} </label>
   
   </div> 

     <div className="form-div">
     <input
       placeholder=" "
       className="form-input"
       type="number"
       id="phone"
       name="phone"
       onBlur={formik.handleBlur}
       onChange={formik.handleChange}
       value={formik.values.phone}
     />
     <label htmlFor="phone" className="form-label"> {formik.touched.phone && formik.errors.phone ? (
       <p style={{color: "#f00", fontSize:"13px", lineHeight: 0.01}}>{formik.errors.phone}</p>
     ) : "phone"} </label>
   
   </div> 

           <button type="submit" className="form-button">Submit</button>

       </form>
     </div>
   
    </>
  )
}

export default CompleteInfo









