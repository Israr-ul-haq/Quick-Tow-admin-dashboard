import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
function ViewService() {
  // SERVICES
 

  //State
  // const [user, setUser] = useState({})
  // const [eventCount, setEventCount] = useState(0)
  // const [loader, setLoader] = useState(true)
  // const { UserId } = useParams()

  // //UseEffect
  // useEffect(() => {
  //   if (eventCount === 0) {
  //     getEvent()
  //     setEventCount(1)
  //   }
  // }, [user, eventCount]) // eslint-disable-line react-hooks/exhaustive-deps

  // //Functions

  // const getEvent = async () => {
  //   const response = await userService.getById(UserId)
  //   if (response.data.Code === 1) {
  //     setUser(response.data.Data)
  //     setLoader(false)
  //   }

  //   if (response.data.Code === 0) {
  //     Swal.fire({
  //       position: "center",
  //       icon: "error",
  //       title: response.data.Data.Message,
  //       showConfirmButton: true,
  //       timer: 5000,
  //     })
  //   }
  // }

    return (
        <div>
             <main>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                   <div className="headertopbar">
                    <Link className="arrow-container_link" to="/ManageServices">
                        <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg"/>
                          <h1 className="headertopbar_title">View Service</h1>
                      </Link>
                      <div className="primary-multiple-btns">
                  <Link to="/EditService" className="profile-business-accept btn btn-primary btnAddnew">Edit Service</Link>
               </div>
                   </div>
                </div>
                 <div className="col-12 column_margin">
                    <div className="card_custom">
                
                
                      <div className="row">
                        <div className="col-md-12">
                        <h3 className="User_Profile_Name">
                        Service Details</h3>
                          </div>
                       <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-8">
                                <h3 className="view-profile-name">
                                Service Name</h3>
                                <h4 className="view-profile-user-name">Tire Change</h4>
                                </div>
                                <div className="col-md-4">
                                <h3 className="view-profile-name">
                                Service Price</h3>
                                <h4 className="view-profile-user-name">$20</h4>
                        </div>
                        <div className="col-md-12">
                                <div className="checkBox_Input">
                                    <input className="Input_checbox" type="checkbox"/>
                                    <p className="check_box_text">Do you have a spare tire with you?</p>
                                    </div>
                                    </div>
                       
                     
                       
                       
                       </div>
                    </div>
              </div>
                  
            </div>
        </div>
    </div>
        </div>
        
        </main>
        
        </div>

    )
}
export default ViewService;
