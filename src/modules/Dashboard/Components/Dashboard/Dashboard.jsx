import Header from "../../../Shared/Components/Header/Header";
import { useAuthContext } from '../../../../Context/AuthContext';
import headerImg from '../../../../assets/images/Group 48102098.png'
import { Link } from "react-router-dom";
export default function Dashboard() {
  const { userData } = useAuthContext();
  return (
    <div className="container-fluid">
      <Header
        title={`Welcome ${userData?.userName}!`}
        description={<>This is a welcoming screen for the entry of the application,<br />you can now see the options</>}
        image={headerImg}
      />
      <div className="mainContent">
     <div className="d-flex justify-content-between align-items-center">
     <div >
       <h5>Fill the <span className="title-span"> Recipes</span> !</h5>
      <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
     </div>
      <div>
       <Link to={'/dashboard/recipes-data'}  className="btn submit-btn">Fill Recipes <i className="fa-solid fa-arrow-right mx-2"></i></Link>
        </div>
     </div>
      </div>
    </div>
  );
}