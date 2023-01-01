import React, { useEffect, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import UsersService from "../../services/UsersService"
import { statusId } from "../StatusId"


function ViewUser() {

  const userService = new UsersService()
  const history = useHistory()
  const {userStatus} = useParams()
  const { id } = useParams()
  const [userData, setUserData] = useState({})
  const [vehicleData, setVehicleData] = useState({})
  const [cardHolder, setCardHolder] = useState({})
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [btnLock, setBtnLock] = useState(true)

  useEffect(() => {
    if (dataCount === 0) {
      getUserData()
      setDataCount(1)
    }
  }, [userData]) // eslint-disable-line react-hooks/exhaustive-deps

  const getUserData = async () => {
    
    const response = await userService.getById(id)
    debugger
    if (response.data.code === 1) {
      setUserData(response.data.data[0])
      setVehicleData(response.data.data[0].vehicles[0])
      setCardHolder(response.data.data[0].cards[0])
      setBtnLock(false)
    }
    setLoader(false)
  }


  const blockedUser = async () => {
    debugger
    try {
      debugger
      const response = await userService.updateStatus(id,statusId.blocked)
      if (response.data.code === 1) {
        setBtnLock(false)
        history.push("/UserManagement")
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User has been Blocked",
          showConfirmButton: true,
          timer: 5000,
        })
      }
    } catch (error) {
      setBtnLock(false)
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }

  const unBlockedUser = async () => {
    debugger
    try {
      debugger
      const response = await userService.updateStatus(id,statusId.unBlocked)
      if (response.data.code === 1) {
        setBtnLock(false)
        history.push("/UserManagement")
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User has been UnBlocked",
          showConfirmButton: true,
          timer: 5000,
        })
      }
    } catch (error) {
      setBtnLock(false)
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      })
    }
  }


  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <Link className="arrow-container_link" to="/UserManagement">
                  <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />
                  <h1 className="headertopbar_title">Profile-User</h1>
                </Link>
                < div className="primary-multiple-btns">
                  <Link to={`/EditUser/${id}`} className="profile-business-accept btn btn-primary btnAddnew">Edit Profile</Link>
                </div>
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
                        style={{ width: "70%", height: "190px", borderRadius: "15px" }}
                        alt="event_image"
                        src={userData.profilePhoto}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-4">
                          <h3 className="view-profile-name">
                            First Name</h3>
                          <h4 className="view-profile-user-name">{userData.firstName}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">Last Name</h3>
                            <h4 className="view-profile-user-name">{userData.lastName}</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <h3 className="view-profile-name">
                            Phone Number</h3>
                          <h4 className="view-profile-user-name">{userData.phoneNumber}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">Rating</h3>
                            <div className="star_section" >
                              <h4 className="view-profile-user-name">{userData.ratings}</h4>
                              {userData.ratings === 0 ? <img alt="star" src="/img/Icon awesome-star_grey.png" style={{width: "17px" , height: "17px"}} /> : <img alt="star" src="/img/Icon awesome-star.png" />}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <h3 className="view-profile-name">
                            Email</h3>
                          <h4 className="view-profile-user-name">{userData.email}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">Password</h3>
                            <h4 className="view-profile-user-name">{userData.password}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                      Vehicle Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Name</h3>
                        <h4 className="view-profile-user-name">{vehicleData.make}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Model</h3>
                        <h4 className="view-profile-user-name">{vehicleData.model}</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Number</h3>
                        <h4 className="view-profile-user-name">{vehicleData.licensePlateNumber}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Category</h3>
                        <h4 className="view-profile-user-name">{vehicleData.transmissionTypeId === 1 ? "AWD" : "FWD"}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                )}

              </div>
            </div>

            {/* <div className="col-12 column_margin">
              <div className="card_custom">
              {loader ? (
                  Loader
                ) : (

                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Card Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Card Holder Name</h3>
                        <h4 className="view-profile-user-name">{cardHolder.cardNumber}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Card Number</h3>
                        <h4 className="view-profile-user-name">{cardHolder.nameOnCard}</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Expiry Date</h3>
                        <h4 className="view-profile-user-name">{cardHolder.cardExpiry}</h4>
                      </div>

                    </div>
                  </div>
                </div>
                )}

              </div>
            </div> */}
          </div>
        </div>
        <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
          <div className="formbtncontainer" style={{ paddingBottom: "50px" }}>
          {userStatus.toLowerCase() === "blocked"? (
             <button type="submit" disabled={btnLock} onClick={unBlockedUser} className="profile-business-accept btn btn-primary">
             Unblock {btnLock ? <div class="btnloader">{Loader}</div> : ""}
           </button>)
            :(
              <button type="submit" disabled={btnLock} onClick={blockedUser} className="profile-business-accept btn btn-primary">
              Block {btnLock ? <div class="btnloader">{Loader}</div> : ""}
            </button>
           )}
            <Link to="/UserManagement" className="btn_primary btn_email_primary view_user_cancel" >
              Cancel
            </Link>
          </div>
        </div>
      </main>

    </div>

  )
}
export default ViewUser;
