import { Link } from "react-router-dom";


export function ToDoIndex(){
    return(
        <div className="bg-con d-flex justify-content-center">
            <div className="d-flex align-items-center">
                <Link to="/register" className="btn btn-secondary mx-2">New Registration</Link>
                <Link to="/login" className="btn btn-warning">Login</Link>
            </div>
        </div>
    )
}