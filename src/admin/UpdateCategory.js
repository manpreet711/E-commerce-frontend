import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategories = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [values, setValues] = useState({ getRedirected: false });
  const { getRedirected } = values;

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className=" mt-4 d-flex justify-content-end">
      <Link className="btn btn-md btn-secondary mb-3" to="/admin/dashboard">
        Admin Home{" "}
      </Link>
    </div>
  );

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setError("true");
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCategory(match.params.categoryId, user._id, token, name).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
          setValues({ ...values, getRedirected: true });
        }
      }
    );
  };

  const sucessMessage = (err) => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4> Category Created Successfully</h4>
    </div>
  );

  const warningMessage = (error) => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error} Failed to create Category</h4>
    </div>
  );

  const performRedirect = () => {
    if (getRedirected) {
      setTimeout(() => {
        window.history.back();
      }, 2000);
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead" className="h2">
          {" "}
          Enter the category{" "}
        </p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          onChange={handleChange}
          value={name}
        />
        <button onClick={onSubmit} className="btn btn-info">
          {" "}
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a category here"
      description="Update"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-12 text-white bg-dark">
          {sucessMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
          {performRedirect()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategories;

// import React, {useState,useEffect} from "react";
// import Base from "../core/Base";
// import { updateCategory,getCategory } from "./helper/adminapicall";
// import { isAutheticated } from "../auth/helper";
// import { Link } from "react-router-dom";

// const UpdateCategories = ({match}) =>{

//     const [values, setValues] = useState({
//       name:"",
//       category: "",
//       loading: false,
//       error:"",
//       success:"",
//       getRedirected: false,
//       formData: ""
//   });

//   const {name,category,loading,error,success,getRedirected,formData} = values

//   const {user,token} = isAutheticated();

//   const goBack = () => (
//     <div className= " mt-4 d-flex justify-content-end" >
//         <Link className="btn btn-md btn-secondary mb-3" to="/admin/dashboard">Admin Home </Link>
//     </div>
// );

//   const preload = (categoryId) => {
//     getCategory(categoryId).then(data =>{
//       if(data.error){
//         setValues({...values, error:  data.error});
//       }else{
//         // preloadCategories();
//         setValues({...values,
//           name:data.name,
//           formData:new FormData()
//       });
//       }
//     });
//   };

//   useEffect(() => {
//     preload(match.params.categoryId);
//   },[]);

//   // const  handleChange = event => {
//   //   event.preventDefault();
//   //   setValues({...values, name: event.target.value})
//   // };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     setValues({...values,errror: "",loading: true})
//     //backend request fired
//     updateCategory(match.params.categoryId,user._id, token,{name}).then(data => {
//         if(data.error){
//           setValues({...values,error:data.error})
//         }else{
//           setValues({...values,name:"",loading:false,getRedirected:true});
//         }
//     })
// };

//   const myCategoryForm = () => (
//     <form>
//         <div className="form-group">
//             <p className="lead" className="h2"> Updtae Your category </p>
//             <input
//             type= "text"
//               onChange={handleChange("name")}
//               className="form-control my-3"
//               value={name}
//             />
//             <button onClick={onSubmit} className="btn btn-info"> Update Category</button>
//         </div>
//     </form>
// );

//     return(
//         <Base title="Update Your Categories here!"
//         description="Welcome to category updation section"
//         className="container bg-info p-4">
//         <div className="row bg-white rounded">
//                 <div className="col-md-12 text-white bg-dark">
//                 {myCategoryForm()}
//                 {goBack()}
//                 </div>
//             </div>

//         </Base>
//     );
// };

// export default UpdateCategories;
