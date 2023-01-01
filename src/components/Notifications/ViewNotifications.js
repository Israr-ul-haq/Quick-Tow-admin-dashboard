import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import Loader from "../../shared/Loader"
import Swal from "sweetalert2"
function ViewNotifications() {
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
                <div className="row">
                    <div className="col-12">
                        <div className="headertopbar">
                            <h1 className="headertopbar_title">Notifications</h1>
                        </div>
                    </div>
                </div>


                <div className="row card-row">
                    <div className="col-md-12 classes-card__column classStats">

                        <div className="card classes-card">
                            <div className="tab-content">
                                <div id="menu1" className="tab-pane active">
                                    <div className="card_custom">

                                        <div className="notification-main">
                                            <div className="notification-body">
                                                <div className="notification-img">
                                                    <img src="/img/Notification (1).svg" alt="" />
                                                </div>
                                                <div className="notification-text">
                                                    <h5 className="notification_headline">Warnings</h5>
                                                    <p className="view-profile-user-name">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus</p>
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
export default ViewNotifications;
