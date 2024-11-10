import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function UserRegister(){
var navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            UserId : "",
            UserName:"",
            Password:"",
            Mobile:"",
            Email:""
        },
        onSubmit:(user)=>{
            axios.post(`http://127.0.0.1:8080/register`,user)
            .then(()=>{
                alert('Rester successfully')
                navigate('/login');
            })
        }
    })
    return(
       <div className="d-flex justify-content-center">
         <div className="bg-warning my-4 p-4 w-50 d-flex flex-column rounded-2">
            <h2>New User Register</h2>
            <form className="text-start" onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange}  className="form-control"/></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Mobile Number</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" onChange={formik.handleChange} className="form-control"/></dd>
                </dl>
                <button className="btn btn-light">Register</button>
            </form>
            <div className="text-start">
                <Link to="/">Home</Link>
                <Link className="mx-3" to="/login">Login</Link>
            </div>
        </div>
       </div>
    )
}