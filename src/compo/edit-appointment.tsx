import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { AppointmentContract } from "../contracts/appointments"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCookies } from "react-cookie"

export function EditAppointment(){
    const [appoint,setAppoint] = useState<AppointmentContract[]>([{Appointment_id:0, Title:"", Description:'',Date:new Date(),UserId:''}])
    const [cookie,setCookie,removeCookie] = useCookies(['userid'])
    let params = useParams()
    let navigate = useNavigate()

    useEffect(()=>{
        
        axios.get(`http://127.0.0.1:8080/get-appointment/${params.id}`)
        .then(res=>{
            setAppoint(res.data)
            console.log(params.id)
        })
    },[])
   const formik = useFormik({
    initialValues:{
        Appointment_id:appoint[0].Appointment_id,
        Title:appoint[0].Title,
        Description:appoint[0].Description,
        Date:appoint[0].Date,
        UserId:cookie['userid'].toString()
    },onSubmit:(vals)=>{
        axios.put(`http://127.0.0.1:8080/edit-appointment/${params.id}`,vals)
        .then(()=>{
            alert('appointment updated successfully')
            navigate('/dashboard')
        })
    },
    enableReinitialize:true
   })
   
    return(
        <div className="d-flex">
            <div className="text-start p-3 bg-secondary m-3 rounded">
            <h2>Edit Appointment</h2>
                <form onSubmit={formik.handleSubmit}>
                <dl>
                <dt>Appointment Id</dt>
                    <dd><input type="number" name="Appointment_id" onChange={formik.handleChange} value={formik.values.Appointment_id} className="form-control"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange} value={formik.values.Title}  className="form-control"/></dd>
                    <dt>Description</dt>
                    <dd><textarea rows={4} cols={20} name="Description" onChange={formik.handleChange} value={formik.values.Description} className="form-control"></textarea></dd>
                    <dt>Date</dt>
                    <dd><input type="date" name="Date" onChange={formik.handleChange} value={formik.values.Date.toString().slice(0,appoint[0].Date.toString().indexOf('T'))} className="form-control"/></dd>           
                </dl>
                <button className="btn btn-outline-light">Save</button>
                <Link to="/dashboard">Back to dashboard</Link>
                </form>
            </div>
        </div>
    )
}