import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppointmentContract } from "../contracts/appointments"
import axios from "axios"
import { useCookies } from "react-cookie"

export function DeleteAppointment(){
    const [cookie,setCookie,removeCookie]=useCookies(['userid'])
    const [delAppoint,setDeleAppoint] = useState<AppointmentContract[]>([{Appointment_id:0,Title:'',Description:"",Date:new Date(),UserId:''}])
    let params = useParams()
    let navi= useNavigate()
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8080/get-appointment/${params.id}`)
        .then(res=>{
            setDeleAppoint(res.data)
        })
        
    },[])

    
    function handleDelete(){
        axios.delete(`http://127.0.0.1:8080/delete-appointment/${params.id}`)
            .then(()=>{
                alert('deleted successfully')
                navi('/dashboard')
            })
    }

    return(
        <div className="p-3">
        <div className="text-start m-4 alert alert-danger">
            <h2>Deleting the Appointment</h2>
            <div>
                <dl>
                    <dt>Title</dt>
                    <dd>{delAppoint[0].Title}</dd>
                    <dt>Description</dt>
                    <dd>{delAppoint[0].Description}</dd>
                    <dt>Date</dt>
                    <dd>{delAppoint[0].Date.toString()}</dd>
                </dl>
                <button onClick={handleDelete} className="btn btn-danger bi bi-trash-fill">Ok</button>
                 <Link to="/dashboard">Cancle</Link>
            </div>
        </div>
        </div>
    )
}