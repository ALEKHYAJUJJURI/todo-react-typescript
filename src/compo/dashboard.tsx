import { useEffect, useState } from "react"
import { Cookies, useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import { AppointmentContract } from "../contracts/appointments"
import axios from "axios"


export function Dashbosrd(){

    const [cookie,setCookie,removeCookie] = useCookies(['userid'])
    const [appointments,setAppointments] = useState<AppointmentContract[]>([])
    let navigate = useNavigate()

    function signout(){
        removeCookie('userid')
        navigate('/login')
    }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8080/appointments/${cookie['userid']}`)
        .then(res=>{
            console.log(res.data)
            setAppointments(res.data)
        })
    },[])
    
    return(
        <div>
           <div className="d-flex p-3 justify-content-between">
           <div className="h2"><span className="text-danger">{cookie['userid']}</span> Dashboard</div>
           <div><button className="btn btn-dark" onClick={signout}>Sign Out</button></div>
           </div>
           <div className="text-start mx-3">
            <Link to="/add-appointment"><button className="btn btn-secondary"><span className="bi bi-book-half"></span>Appointments</button></Link>
           </div>
           <div className="d-flex flex-wrap">
          {
            appointments?.map(item=>
                <div key={item.Appointment_id} className="alert alert-success m-3 p-3 text-start rounded w-25">
                    <div>
                        <h2>{item.Title}</h2>
                        <p>{item.Description}</p>
                        <p>{item.Date.toString()}</p>
                    </div>
                    <div className=" ">
                        <button className="bi bi-pen-fill btn btn-warning"></button>
                        <button className="bi bi-trash-fill btn btn-danger mx-2"></button>
                        </div>
                </div>
            )
          }
          </div>
        </div>
    )
}