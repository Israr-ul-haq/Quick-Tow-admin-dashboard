import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
import CompanyService from "../../services/CompanyService"
function ViewCompanyProfile() {
  // SERVICES

const companyService = new CompanyService()
const { userId } = useParams()
const [picture, setPicture] = useState(null)
const [loader, setLoader] = useState(true)
const [dataCount, setDataCount] = useState(0)
const [btnLock, setBtnLock] = useState(false)

const [user, setUser] = useState({
})

const [company, setCompany] = useState({
})

const [account, setAccount] = useState({
})


useEffect(() => {
  if (dataCount === 0) {
      getCompany()
      setDataCount(1)
  }
}, [user, ]) // eslint-disable-line react-hooks/exhaustive-deps
  const getCompany = async () => {
    const response = await companyService.getById(userId)
    debugger
    console.log(response)
    if (response.data.code === 1) {
        setUser(response.data.data)
        setCompany(response.data.data.companies[0])
        setAccount(response.data.data.accounts[0])
        setLoader(false)
    }

    if (response.data.Code === 0) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: response.data.Data.Message,
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
                <Link className="arrow-container_link" to="/ManageCompany">
                  <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />

                  <h1 className="headertopbar_title">View Company</h1>
                </Link>
                < div className="primary-multiple-btns">
                  <Link to="/ManageCompanyDrivers">
                    <button type="button" className="headertopbar_btn btn_primary">
                      View Drivers
                    </button>
                  </Link>
                  <Link to={`/EditCompany/${userId}`} className="profile-business-accept btn btn-primary btnAddnew">Edit Profile</Link>
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
                      src={user.profilePhoto}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          First Name</h3>
                        <h4 className="view-profile-user-name">{user.firstName}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Email</h3>
                          <h4 className="view-profile-user-name">{user.email}</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                         Last Name</h3>
                        <h4 className="view-profile-user-name">{user.lastName}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Number of Drivers</h3>
                          <h4 className="view-profile-user-name">{user.noOfDrivers}</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Phone Number</h3>
                        <h4 className="view-profile-user-name">{user.phoneNumber}</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Password</h3>
                          <h4 className="view-profile-user-name user_password">{user.password}</h4>
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
                      Company Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Company Name</h3>
                        <h4 className="view-profile-user-name">{company.companyName}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Company Email</h3>
                        <h4 className="view-profile-user-name">{company.companyEmail}</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Phone Number</h3>
                        <h4 className="view-profile-user-name">{company.companyPhoneNumber}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Address</h3>
                        <h4 className="view-profile-user-name">{company.address}</h4>
                      </div>
                      <div className="col-md-3">
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">
                            Company website</h3>
                          <h4 className="view-profile-user-name">{company.website}</h4>
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
                      Account Details</h3>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Bank Name</h3>
                        <h4 className="view-profile-user-name">{account.bankName}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Account Name</h3>
                        <h4 className="view-profile-user-name">{account.accountName}</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Account Number</h3>
                        <h4 className="view-profile-user-name">{account.accountNumber}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>

    </div>

  )
}
export default ViewCompanyProfile;
