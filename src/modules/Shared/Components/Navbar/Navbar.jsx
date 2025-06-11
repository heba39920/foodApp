import { useAuthContext } from "../../../../Context/AuthContext";
import logo from "../../../../assets/images/4 3.png";

export default function NavBarComponent() {
 const  {userData}= useAuthContext();
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary m-3 rounded-2">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo} alt="nav logo" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">{userData?.userName}</a>
        </li>
          
      </ul>
     
    </div>
  </div>
</nav>
  )
}
