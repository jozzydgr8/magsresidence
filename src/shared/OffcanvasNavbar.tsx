
import { NavLink } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { UseAuthContext } from "../context/UseAuthContext";



export const OffcanvasNavbar = () => {

  const {dispatch:handle, user} =UseAuthContext();
  const handleNavLinkClick = () => {
  const dismissButton = document.querySelector(
    '#offcanvasNavbar [data-bs-dismiss="offcanvas"]'
  ) as HTMLElement | null;

  if (dismissButton) {
    dismissButton.click(); 
  }
};

 // Runs when route changes

 const handleLogOut = ()=>{
  if (!user){ return}
    localStorage.removeItem('user');
    handle({type:'logout'});
 }

  return (
    <nav className="navbar bg-body-tertiary" data-bs-theme="light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/admin_jctbdil1$" >
          <h2>Mags Residence Dashboard</h2>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <h2>Mags Residence</h2>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/admin_jctbdil1$"onClick={handleNavLinkClick}>
                  Dashboard
                </NavLink>
              </li>
             
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  
                >
                  More
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      onClick={handleNavLinkClick}
                      className="dropdown-item"
                      to="/admin_jctbdil1$/apartments/addapartments"
                    >
                      Add New Apartment <PlusOutlined />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin_jctbdil1$/bookings" onClick={handleNavLinkClick}>

                      View Bookings
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  
                  {
                    user && (
                      <li>
                        <NavLink className="dropdown-item" to="#" 
                         onClick={() => {
                          handleNavLinkClick();
                          handleLogOut();
                        }}>
                          Log Out
                        </NavLink>
                      </li>
                    )
                  }
                </ul>
              </li>
            </ul>
          
           
          </div>
        </div>
      </div>
    </nav>
  );
};