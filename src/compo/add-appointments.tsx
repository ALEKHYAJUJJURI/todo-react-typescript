import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AddAppointments(){
const [cookie,setCookie,removeCookie] = useCookies(['userid'])

    let navigate = useNavigate()
    var formik = useFormik({
        initialValues:{
            Appointment_id :0,
            Title : "",
            Description : '',
            Date : '',
            UserId : cookie['userid'].toString()
        },
        onSubmit:(values)=>{
            console.log(values)
            axios.post(`http://127.0.0.1:8080/add-appointment`,values)
            .then(()=>{
                console.log(typeof(values.UserId))
                alert('added successfully')
                navigate('/dashboard')
            })
        }
    })
    return(
        <div>
            <h2>Add Appointment</h2>
           <div className="w-50 mx-4 bg-secondary rounded p-3">
           <form onSubmit={formik.handleSubmit}>
                <dl className="text-start">
                    <dt>Appointment Id</dt>
                    <dd><input type="text" name="Appointment_id" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Description</dt>
                    <dd><textarea rows={4} onChange={formik.handleChange} cols={20} name="Description" className="form-control"></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" onChange={formik.handleChange} className="form-control"/></dd>           
                </dl>
                <button className="btn btn-light" type="submit">Add Appointment</button>
            </form>
           </div>
            <Link to="/dashboard">Back to dashboard</Link>
        </div>
    )
}