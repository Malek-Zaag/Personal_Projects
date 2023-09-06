import DashboardNavbar from "./DashboardNavbar"
import './Dashboard.css'
import Sidebar from "./Sidebar"
import Monitoring from "../Monitoring/Monitoring"
import background from './background.png'
function Dashboard()
{
    return (
        <><DashboardNavbar></DashboardNavbar>
        <Sidebar></Sidebar>
        <Monitoring></Monitoring>
        <div>
        <h5 class="typewriter">Welcome!  <span>Configure and monitor your infrastructure here !</span></h5>
        <img src={background} className='logo-img'></img>
        <div className="pageVM">
        <a href='/'>   <button type="button" class="btn btn-outline-secondary">Home Page</button></a>
        <a href='/CreateVM'>   <button type="button" class="btn btn-outline-secondary">Create VM</button></a>
        </div>
        </div>
        </>
        
    )

}
export default Dashboard