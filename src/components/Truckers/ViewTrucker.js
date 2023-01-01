import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
function ViewTrucker() {
 

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <Link className="arrow-container_link" to="/TruckManagement">
                  <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" />
                  <h1 className="headertopbar_title">Profile-Truckers</h1>
                  </Link>
                  <div className="primary-multiple-btns">
                  <Link to="/EditTruck" className="profile-business-accept btn btn-primary btnAddnew">Edit Profile</Link>
               </div> 
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
                {/* User Details Start               */}
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      User Details</h3>
                  </div>
                  <div className="col-md-3">
                    <img
                      style={{ width: "70%", height: "190px", borderRadius: "15px" }}
                      alt="event_image"
                      src="/img/view_profile.png"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Full Name</h3>
                        <h4 className="view-profile-user-name">Doris Clark</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Password</h3>
                          <h4 className="view-profile-user-name">*****</h4>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Phone Number</h3>
                        <h4 className="view-profile-user-name">+92 6345367262</h4>
                        <div className="view-profile-pwd">
                          <h3 className="view-profile-name">Rating</h3>
                          <div className="star_section" >
                            <h4 className="view-profile-user-name">4.2</h4>
                            <img alt="star" src="/img/Icon awesome-star.png" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <h3 className="view-profile-name">
                          Email</h3>
                        <h4 className="view-profile-user-name">Doris Clark@gmail.com</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Details End */}

            {/* Vehicle Details Start */}
            <div className="col-12 column_margin">
              <div className="card_custom">


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
                        <h4 className="view-profile-user-name">Honda</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Model</h3>
                        <h4 className="view-profile-user-name">City 2000</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Number</h3>
                        <h4 className="view-profile-user-name">ABC 857</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Vehicle Category</h3>
                        <h4 className="view-profile-user-name">Car</h4>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* Vehicle Details End */}


            {/* Attached Documents start */}
            <div className="col-12 column_margin">
              <div className="card_custom">

                <div className="row">
                  <div className="col-md-12">
                    <h3 className="User_Profile_Name">
                      Attached Documents</h3>
                  </div>
                  <div className="col-md-12">
                    <div className="section_images" style={{ paddingBottom: "45px" }}>

                     
                      <img alt="id" src="/img/Insurance info.png" className="doc_Sec_img" />

                      <div className="position_relative_card">
                      </div>
                      <img alt="license" src="/img/License.png" className="doc_Sec_img" />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="view-profile-name">
                          Insurance Information</h3>
                        <h4 className="view-profile-user-name">here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form. here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</h4>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* Attached Documents End */}



            {/* Card Details Start */}
            <div className="col-12 column_margin">
              <div className="card_custom">

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
                        <h4 className="view-profile-user-name">Mathew John</h4>
                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Card Number</h3>
                        <h4 className="view-profile-user-name">5200828282828210</h4>

                      </div>
                      <div className="col-md-3">
                        <h3 className="view-profile-name">
                          Expiry Date</h3>
                        <h4 className="view-profile-user-name">22-04-2022</h4>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* // Card Details End  */}
        <div className="col-12 column_margin">
        

          <div className="row">
            <div className="col-md-12">
              <h3 className="User_Profile_Name">
              Live Location</h3>
            </div>
            <div style={{paddingBottom:"110px", width:"100%"}}>
            <img src="/img/Screenshot_2.png" alt="" style={{width:"100%", height:"366px", borderRadius:"2px"}}/>
            </div>
          </div>
        </div>
      </main>
    </div>



  )
}
export default ViewTrucker;
