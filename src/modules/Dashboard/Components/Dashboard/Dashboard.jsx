import Header from "../../../Shared/Components/Header/Header";
import { useAuthContext } from '../../../../Context/AuthContext';
import headerImg from '../../../../assets/images/Group 48102098.png'
import {useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Dashboard() {
 const [mode] = useState('add');

  const { userData } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <Header
        title={`Welcome ${userData?.userName}!`}
        description={
          <>
            This is a welcoming screen for the entry of the application,
            <br />
            you can now see the options
          </>
        }
        image={headerImg}
      />
      <div className="mainContent">
        <div className="d-flex justify-content-between align-items-center my-4">
          <div>
            <h5>
              Fill the <span className="title-span">Recipes</span>!
            </h5>
            <p>
              You can now fill the meals easily using the table and form. Click here and fill it with the table!
            </p>
          </div>
          <div>
            <button onClick={() => { 
            navigate('/dashboard/recipes-data', { state: { mode } })
            }} className="btn submit-btn">
              Fill Recipes <i className="fa-solid fa-arrow-right mx-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}