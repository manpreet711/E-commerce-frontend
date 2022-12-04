import React,{useState} from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {

    const [name,setName] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const [values, setValues] = useState({getRedirected: false});
    const {getRedirected} = values

    const {user,token} = isAutheticated();

    const goBack = () => (
        <div className= " mt-4 d-flex justify-content-end" >
            <Link className="btn btn-md btn-secondary mb-3" to="/admin/dashboard">Admin Home </Link>
        </div>
    );


    const handleChange = (event) =>{
        setError("");
        setName(event.target.value)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false)

        //backend request fired
        createCategory(user._id, token, {name}).then(data => {
            if(data.error){
                setError(true)
            }else{
                setError("")
                setSuccess(true)
                setName("")
                setValues({...values, getRedirected:true})
            }
        })
    };

    const sucessMessage = (err) => (
        <div className="alert alert-success mt-3" style={{display: success ? "" : "none" }}>
          <h4> Category Created Successfully</h4>
        </div>
      );

    const warningMessage = (error) => (
        <div className="alert alert-danger mt-3" style={{display: error ? "" : "none" }}>
          <h4>{error} Failed to create Category</h4>
        </div>
      );

      const performRedirect =() => {
        if(getRedirected){ 
          setTimeout(() => {
            window.history.back()
          },2000)
        };
    };


    const myCategoryForm = () => (
        <form>
            <div className="form-group">
                <p className="h2"> Enter the category </p>
                <input type="text" 
                className="form-control my-3" 
                autoFocus  
                required placeholder="For eg. Summer"
                onChange={handleChange}
                value={name} />
                <button onClick={onSubmit} className="btn btn-info"> Create Category</button>
            </div>
        </form>
    );


    return(
        <Base title="Create a category here"
        description="Add a new category for new tshirts"
        className="container bg-info p-4">
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


export default AddCategory;