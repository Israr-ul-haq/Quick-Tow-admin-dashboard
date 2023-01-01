import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import ProfileService from "../../../services/ProfileService"

function Header() {
  //State
  const history = useHistory()
  const [userData, setUserData] = useState({})
  const [loader, setLoader] = useState(true)
  const [dataCount, setDataCount] = useState(0)
  //UseEffect
  // useEffect(() => {
<<<<<<< HEAD
  //   setUserData(JSON.parse(localStorage.getItem("quicktowuser")))
  // }, [])

  // const removeClass = (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   document.querySelectorAll(".main-menu li a").forEach((item) => {
  //     item.closest("li").classList.remove("active")
  //   })
  //   document.querySelector(".userdropdowncontainer").closest("li").classList.remove("active")
  //   document.querySelector(".navbar-right .dropdown-menu-right").classList.remove("show")
  //   history.push("/Profile")
  // }

  // const logout = (evt) => {
  //   evt.preventDefault()
  //   evt.stopPropagation()
  //   localStorage.removeItem("quicktowuser")
  //   // document.querySelector(".userdropdownmenu").remove()
  //   history.push("/account/login")
  // }
=======
  //   setUserData(JSON.parse(localStorage.getItem("makhtabquser")))
  // }, [])
  useEffect(() => {
    if (dataCount === 0) {
      getProfile()
      setDataCount(1)
    }
  }, [userData]) // eslint-disable-line react-hooks/exhaustive-deps
  const profileService = new ProfileService()
  const getProfile = async () => {
    const response = await profileService.getById(JSON.parse(localStorage.getItem("makhtabquserId")))
    setUserData(response.data.Data)
    setLoader(false)
  }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e

  const toggleMenu = (e) => {
    e.stopPropagation()
    document.querySelector(".menu .main-menu").classList.toggle("mainmenu_active")
    document.querySelector(".navbar-logo").classList.toggle("logo_active")
    // document.querySelector(".userdropdownmenu").classList.toggle("userdropdownmenu_sidebaractive")
    document.querySelector("main").classList.toggle("main_sidebaractive")
  }

  return (
    <div>
      <div id="app-container" className="menu-default show-spinner">
        <nav className="navbar fixed-top">
          <div className="d-flex align-items-center navbar-left">
            <Link className="navbar-logo" to="/">
              <img className="logo d-none d-xs-block" src="./img/Car Tow logo.svg" alt="logo" />
              <img className="logo-mobile d-block d-xs-none" src="./img/Car Tow logo.svg" alt="mobile-logo" />
            </Link>
            <button onClick={toggleMenu} className="menu-button d-none d-md-block">
              <img src="./img/list.svg" alt="menu-list" />
            </button>

            <button className="menu-button-mobile d-xs-block d-sm-block d-md-none">
              <img src="./img/list.svg" alt="menu-list" />
            </button>
          </div>

          <div className="navbar-right">
            <Link to="/ViewNotifications">
          <img alt="bellicon"  src="/img/Notification.svg" className="bell_icon_pic"/>
          </Link>
            <div class="user d-inline-block">
              
              {/* <button
                id="dropdownMenuButton"
                class="btn btn-empty p-0"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              > */}
              <Link to="/Profile"  href="gotoprofile">
                <span class="name"> {localStorage.getItem("AdminQuickTowfirstName")}</span>
                <span>
<<<<<<< HEAD
                  <img alt="Profile_Picture" src={localStorage.getItem("AdminQuickTowImage")} className="admin-pic" />
=======
                  <img
                    alt="Profile_Picture"
                    src={
                      userData.ProfilePicture ? "https://maktabq-api.jinnbytedev.com" + userData.ProfilePicture : "/img/male-placeholder-image.jpeg"
                    }
                    className="admin-pic"
                  />
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
                </span>
                </Link>
              {/* </button> */}

              {/* <div class="dropdown-menu dropdown-menu-right mt-3" aria-labelledby="dropdownMenuButton"> */}
                
                  {/* Profile
              
                <Link  class="dropdown-item" to="/account/login">
                  Sign out
                </Link> */}
              {/* </div> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
export default Header
