import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function UserLogin(){
    const [cookie,setCookie,removeCookie] = useCookies(['userid'])
    let navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            UserId:"",
            Password:""
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:8080/users`)
            .then(res=>{
                var clie = res.data.find((item:any)=>item.UserId === user.UserId)
                console.log(clie)
              if(clie){
                if(clie.Password===user.Password){
                    setCookie('userid',user.UserId)
                    navigate('/dashboard')
                   }
                   else{
                    alert("Incorrect Password")
                   }

              }else{
                alert('Invalid UserId')
              }
            })
        }
    })
    return(
        <div className="d-flex justify-content-center">
           <div className="bg-warning my-4 p-4 w-50 d-flex flex-column rounded-2">
           <h2>User Login</h2>
           <form className="text-start" onSubmit={formik.handleSubmit}>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control"/></dd>
                <dt>Password</dt>
                <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control"/></dd>
            </dl>
            <button className="btn btn-light">Login</button>
           </form>
           <div className="text-start">
            <Link to='/'>Home</Link>
            <Link className="mx-3" to="/register">New User!</Link>
           </div>
           </div>
        </div>
    )
}