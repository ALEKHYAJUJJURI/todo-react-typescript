import { Link } from "react-router-dom";


export function UserDashboard(){

    return(
        <div>
            <h2>User Dashboard</h2>
            <Link to='/dashboard'>Back to dashboard</Link>
        </div>
    )
}