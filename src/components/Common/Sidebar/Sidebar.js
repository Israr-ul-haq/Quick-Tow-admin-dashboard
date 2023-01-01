import { NavLink, useHistory } from "react-router-dom"
import React, { useEffect } from "react"
import PerfectScrollbar from "perfect-scrollbar"
function Sidebar() {
  //State

  // Functions

<<<<<<< HEAD
=======
  const clickHandler = (e) => {
    e.stopPropagation()
    document.querySelector(".userdropdownmenu").classList.toggle("userdropdownmenu-active")
    document.querySelector(".userdropdowncontainer").classList.toggle("userdropdowncontainer-active")
    document.querySelector("html").appendChild(document.querySelector(".userdropdownmenu"))
    document.querySelector(".userdropdownmenu").style.cssText = "position: fixed; left:95px;"
    document.querySelector(".userdropdownmenu").style.top = document.querySelector(".userdropdownli").getBoundingClientRect().top + "px"
    document.querySelectorAll(".userdropdownitem").forEach((item) => {
      item.addEventListener("click", closeUserMenu)
    })
  }

  const handleScroll = (e) => {
    document.querySelector(".userdropdownmenu").style.cssText = "position: fixed; left:95px;"
    document.querySelector(".userdropdownmenu").style.top = document.querySelector(".userdropdownli").getBoundingClientRect().top + "px"
  }

  const closeUserMenu = (e) => {
  
    if (e.target.classList.contains("userdropdownitem") || e.target.classList.contains(".main-menu li")) {
      if (!e.target.classList.contains("userdropdownitem")) {
        if (!e.target.closest("li").classList.contains("active")) {
          if (e.target.classList.contains("active")) {
            document.querySelectorAll(".main-menu li").forEach((item) => {
              item.classList.remove("active")
            })
          }
        }
      }
      if (document.querySelector(".userdropdowncontainer").classList.contains("userdropdowncontainer-active")) {
        document.querySelectorAll(".main-menu li").forEach((item) => {
          item.classList.remove("active")
        })
        document.querySelector(".userdropdownli").classList.add("active")
        document.querySelector(".userdropdowncontainer").classList.remove("userdropdowncontainer-active")
        document.querySelector(".userdropdownmenu").classList.remove("userdropdownmenu-active")
      }
    } else {
      if (document.querySelector(".userdropdowncontainer") || document.querySelector(".userdropdownmenu")) {
        document.querySelector(".userdropdowncontainer").classList.remove("userdropdowncontainer-active")
        document.querySelector(".userdropdownmenu").classList.remove("userdropdownmenu-active")
      }
    }
  }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e

  const addClass = (e) => {
    document.querySelectorAll(".main-menu li a").forEach((item) => {
      item.closest("li").classList.remove("active")
    })
    
    e.target.closest("li").className = "active"
  }

  //UseEffect

  

  useEffect(() => {
    //To initialise:

    const container = document.querySelector("#menuScroll")
    const ps = new PerfectScrollbar(container)
  })

  return (
    <div>
      <div className="menu">
        <div className="main-menu">
          <div id="menuScroll" className="scroll" >
            <ul className="list-unstyled">
              <li onClick={addClass}>
                <NavLink exact to="/">
                  <img src="img/Icon material-dashboard.svg" alt="sidebar-icon" style={{width:"15px", height: "15px"}} />
                  <span>Dashboards</span>
                </NavLink>
              </li>
<<<<<<< HEAD

              <li onClick={addClass} >
               
                  <NavLink to="/UserManagement">
                    <img src="img/user.svg" alt="sidebar-icon" style={{width: "15px", height: "20px"}} />
                    <span>Users</span>
                  </NavLink>
              </li>
=======
              <li className="userdropdownli" onClick={clickHandler}>
                <div className="userdropdowncontainer">
                  <img src="img/user.svg" alt="sidebar-icon" />
                  <div className="userdropdown">
                    <div className="arrow-down">
                    </div>
                    <span>Users</span>
                    <div className="userdropdownmenu">
                      <NavLink onClick={closeUserMenu} to="/ManageSubAdmin" className="userdropdownitem" id="ManageSubAdmin">
                        Sub Admin
                      </NavLink>
                      <NavLink onClick={closeUserMenu} to="/ManageCSP" className="userdropdownitem" id="ManageCSP">
                        CSP
                      </NavLink>
                      <NavLink onClick={closeUserMenu} to="/ManageBusinessOwner" className="userdropdownitem" id="ManageBusinessOwner">
                        Business Owner
                      </NavLink>
                      <NavLink onClick={closeUserMenu} to="/ManageUser" className="userdropdownitem" id="ManageUser">
                        User
                      </NavLink>
                    </div>
                  </div>
                </div>
              </li>
              <li onClick={addClass}>
                <NavLink to="/Features">
                  <img src="img/feature-selection.svg" alt="sidebar-icon" />
                  <span>Features</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ManageVerifications">
                  <img src="img/verified.svg" alt="sidebar-icon" />
                  <span>Verification</span>
                </NavLink>
              </li>
              {/* <li onClick={addClass}>
                <NavLink to="/ManageCategory">
                  <img src="img/categories.svg" alt="sidebar-icon" />
                  <span>Categories</span>
                </NavLink>
              </li> */}
              {/* <li onClick={addClass}>
                <NavLink to="/ManageSlots">
                  <img src="img/Slots.svg" alt="sidebar-icon" />
                  <span>Slots</span>
                </NavLink>
              </li> */}
              {/* <li onClick={addClass}>
                <NavLink to="/ManageBooking">
                  <img src="img/booking.svg" alt="sidebar-icon" />
                  <span>Booking</span>
                </NavLink>
              </li> */}
              {/* <li onClick={addClass}>
                <NavLink to="/ManageCheckIn">
                  <img src="img/checkins.svg" alt="sidebar-icon" />
                  <span>Check-in</span>
                </NavLink>
              </li> */}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
              <li onClick={addClass}>
                <NavLink to="/TruckManagement">
                  <img src="img/Truckers.svg" alt="sidebar-icon" style={{width: "30px", height: "20px"}} />
                  <span>Truckers</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ManageCompany">
                  <img src="img/building.svg" alt="sidebar-icon" style={{width: "25px", height: "22px"}} />
                  <span>Companies</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ManageServices">
                  <img src="img/Service'.png" alt="sidebar-icon" style={{width: "25px", height: "26px"}}/>
                  <span>Service</span>
                </NavLink>
              </li>

              <li onClick={addClass}>
                <NavLink to="/ManageHistory">
                  <img src="img/Subscription.svg" alt="sidebar-icon" style={{width: "22px", height: "17px"}} />
                  <span>History</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ManageQueries">
                  <img src="img/Query.svg" alt="sidebar-icon" style={{width: "20px", height: "20px"}} />
                  <span>Query</span>
                </NavLink>
              </li>
              <li onClick={addClass}>
                <NavLink to="/ChatRoom">
                  <img src="img/Query.svg" alt="sidebar-icon" />
                  <span>Query</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
