import { useAuthContext } from "../../../../Context/AuthContext";
import logo from "../../../../assets/images/4 3.png";

export default function NavBarComponent({  onToggleSidebar}) {
 const  {userData}= useAuthContext();
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary m-3 rounded-2">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img src={logo} alt="nav logo" /></a>
         {/* LEFT: Burger (موبايل فقط) */}
      <div className="">
        <button
          type="button"
          className={`p-2 border-0 rounded-3   ${window.innerWidth <= 1024? "d-block":"d-none"}`}
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
         <i className="fa fa-bars "></i>
        </button>
      </div>
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
