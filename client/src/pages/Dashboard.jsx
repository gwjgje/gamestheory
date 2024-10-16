import style from '../styles/Dashboard.module.css';
import UserApplications from '../components/UserApplications';
import UserEvents from '../components/UserEvents';

function Dashboard() {
     return (
          <div className={style.Dashboard}>
               <UserApplications />
               <UserEvents />
          </div>
     )
}

export default Dashboard