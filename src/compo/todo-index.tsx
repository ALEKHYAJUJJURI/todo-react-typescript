import { Link } from "react-router-dom";


export function ToDoIndex(){
    return(
        <div className="d-flex align-items-center justify-content-center" style={{'height':'100vh'}}>
            <div className="d-flex justify-content-center">
                <Link to="register" className="btn btn-secondary mx-2">New Registration</Link>
                <Link to="login" className="btn btn-warning">Login</Link>
            </div>
        </div>
    )
}