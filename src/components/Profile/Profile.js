<<<<<<< HEAD
import React, { useEffect, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import profilService from "../../services/ProfileService"
=======
import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import ProfileService from "../../services/ProfileService"
import Loader from "../../shared/Loader"

>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
function Profile() {
const profileservie = new profilService()
  const history = useHistory()
<<<<<<< HEAD
  const logout = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    localStorage.removeItem("AdminQuickTowId")
    localStorage.removeItem("AdminQuickTowImage")
    localStorage.removeItem("AdminQuickTowfirstName")
    localStorage.removeItem("AdminQuickTowToken")
    history.push("/account/login")
  }
  const [loader, setLoader] = useState(true)
  const [btnlock, setBtnLock] = useState(false)
 
  const [userData, setUserData] = useState({})

  
  const [dataCount, setDataCount] = useState(0)
  

  useEffect(() => {
    if (dataCount === 0) {
      getUserData()
      setDataCount(1)
    }
  }, [ userData]) // eslint-disable-line react-hooks/exhaustive-deps

  const getUserData = async () => {
    setBtnLock(true)
    debugger
    const response = await profileservie.getProfileUser(localStorage.getItem("AdminQuickTowId"))
    if (response.data.code === 1) {
      setBtnLock(false)
      setUserData(response.data.data)
      setLoader(false)
    }
  }


  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
               
                  <h1 className="headertopbar_title">Profile</h1>
              
                <div className="primary-multiple-btns">
                  <Link className="headertopbar_btn btn_primary" onClick={logout}>
                    Logout
                  </Link>
                  <Link to="/EditProfile" className="profile-business-accept btn btn-primary btnAddnew">Edit Profile</Link>
                </div>
=======
  const [user, setUser] = useState({})
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  //Fucntions
  const logout = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    // localStorage.removeItem("makhtabquser")
    localStorage.removeItem("makhtabquserId")
    document.querySelector(".userdropdownmenu").remove()
    history.push("/account/login")
  }
  const profileService = new ProfileService()

  useEffect(() => {
    if (dataCount === 0) {
      getProfile()
      setLoader(false)
      setDataCount(1)
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const getProfile = async () => {
    debugger
    const response = await profileService.getById(JSON.parse(localStorage.getItem("makhtabquserId")))
    setUser(response.data.Data)
    setLoader(false)
  }
  return (
    <main>
      <div class="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="headertopbar">
              <Link to="/" className="headertopbar_title">
                {" "}
                <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.png" /> Profile
              </Link>
              <div className="superadmin_buttons">
                <Link to="/account/login" className="btn_primary_outline btn_primary" onClick={logout}>
                  Logout
                </Link>
                <Link to="/EditProfile" class="superadmin-logout btn btn_primary">
                  Edit Profile
                </Link>
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
              {loader ? (
                  Loader
                ) : (
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      User Details</h3>
                  </div>
                  <div className="col-md-3">
                    <img
<<<<<<< HEAD
                      style={{ width: "70%", height: "190px", borderRadius: "4px" }}
                      alt="event_image"
                      src={userData.profilePhoto}
=======
                      alt="Profile_Picture"
                      src={user.ProfilePicture ? "https://maktabq-api.jinnbytedev.com" + user.ProfilePicture : "/img/male-placeholder-image.jpeg"}
                      style={{ width: "65%", height: "150px", borderRadius: "15px" }}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          First Name</h3>
                        <h4 className="view-profile-user-name">{userData.firstName}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Password</h3>
                          <h4 className="view-profile-user-name">{userData.password}</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Last Name</h3>
                        <h4 className="view-profile-user-name">{userData.lastName}</h4>
                        <div className="view-profile-pwd">
                        <h3 className="view-profile-name">
                          Email</h3>
                        <h4 className="view-profile-user-name">{userData.email}</h4>
                      </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Phone Number</h3>
                        <h4 className="view-profile-user-name">{userData.phoneNumber}</h4>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>
                )}

              </div>
            </div>



            {/* <div className="col-12 column_margin">
              <div className="card_custom">

                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Account Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Bank Name</h3>
                        <h4 className="view-profile-user-name">Bank of USA</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Account Name</h3>
                        <h4 className="view-profile-user-name">Regular Account</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Account Number</h3>
                        <h4 className="view-profile-user-name">5200828282828210</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>

    </div>

  )
}
export default Profile;
