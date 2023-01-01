import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import UsersService from "../../../services/UsersService"
import Loader from "../../../shared/Loader"
import { placeData } from "../../../constants/NearByPlaces"

function ViewBusinessOwner() {
  const [feature, setFeature] = useState([])
  const [multipleImages, setMultipleImages] = useState([])
  const [businessOwner, setBusinessOwner] = useState({})
  const [eventCount, setEventCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const { UserId } = useParams()
  const [businessinfos, setBusinessInfos] = useState({})
  const [timing, setTiming] = useState([])
  const [nearByPlace, setNearByPlace] = useState([])
  const businessOwnerService = new UsersService()

  //UseEffect
  useEffect(() => {
    if (eventCount === 0) {
      getUser()
      setEventCount(1)
    }
  }, [businessOwner, eventCount, businessinfos, timing]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions

  const getUser = async () => {
    setLoader(true)
    debugger
    const response = await businessOwnerService.getById(UserId)
    const imageres = await businessOwnerService.getmultipleImages(response.data.Data?.BusinessInfo?.BusinessId)
    if (imageres.data.Code === 1) {
      setMultipleImages(imageres.data.Data)
    }
    if (imageres.data.Code === 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.Data.Message,
        showConfirmButton: true,
        timer: 5000,
      })
    }
    if (response.data.Code === 1) {
      setBusinessOwner(response.data.Data)
      setBusinessInfos(response.data.Data.BusinessInfo)
      setTiming(
        response.data.Data.BusinessInfo.Timings.map((item) => {
          return {
            StartTime: item.StartTime,
            EndTime: item.EndTime,
            Day: item.Day,
          }
        })
      )
      setFeature(
        response.data.Data.BusinessInfo.Features.map((item) => {
          return {
            FeaturesId: item.FeatureId,
            Name: item.Name,
            Icon: item.Icon,
          }
        })
      )

      setLoader(false)

      const getPlaces = response.data.Data.BusinessInfo.NearByPlaces.map((item) => {
        debugger
        return {
          NearByPlaceId: item.NearByPlaceId,
        }
      })

      const placesRes = await businessOwnerService.getPlaces()

      setNearByPlace(placesRes.data.Data)
      getPlaces.forEach(async (item) => {
        document
          .getElementById("placeselect-" + item.NearByPlaceId)
          .closest(".featureselect_column")
          .querySelector(".featureselect_feature")
          .classList.add("featureselect_feature-active")
        document.getElementById("placeselect-" + item.NearByPlaceId).click()
        placesRes.data.Data.forEach((placesItem) => {
          if (placesItem.NearByPlaceId === item.NearByPlaceId) {
            document
              .getElementById("placeselect-" + item.NearByPlaceId)
              .closest(".featureselect_column")
              .querySelector(".featureselect_feature .featureselect_image").src = "https://maktabq-api.jinnbytedev.com" + placesItem.ActiveImage
          }
        })
      })
      console.log(nearByPlace)
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
                <Link className="arrow-container_link" to="/ManageBusinessOwner">
                  <img className="arrow-container_image" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.png" />
                  <h1 className="headertopbar_title">View Profile Business Owner</h1>
                </Link>
                <div className="topbar_btns">
                  {/* <Link to={`/ViewSlots/${businessinfos.BusinessId}`} className="btn_primary_outline btn_primary">
                    Manage Slots
                  </Link> */}
                  <Link to={`/EditBusinessOwner/${UserId}`} className="headertopbar_btn btn_primary">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
                {loader ? (
                  Loader
                ) : (
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        style={{ width: "70%", height: "150px", borderRadius: "15px" }}
                        alt="event_image"
                        src={
                          businessOwner.ProfilePicture
                            ? "https://maktabq-api.jinnbytedev.com/" + businessOwner.ProfilePicture
                            : "/img/male-placeholder-image.jpeg"
                        }
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-4">
                          <h3 className="view-profile-name">Full Name</h3>
                          <h4 className="view-profile-user-name">{businessOwner.Name}</h4>
                          <div className="view-profile-pwd">
                            <h3 className="view-profile-name">Password</h3>
                            <h4 className="view-profile-user-name">*****</h4>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <h3 className="view-profile-name">Phone Number</h3>
                          <h4 className="view-profile-user-name">{businessOwner.Phone}</h4>
                        </div>
                        <div className="col-md-4">
                          <h3 className="view-profile-name">Email</h3>
                          <h4 className="view-profile-user-name">{businessOwner.Email}</h4>
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
                    <div className="col-md-12 profile-business-information">
                      <h3 className="view-profile-payment">Business Information</h3>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="buisness-profile-images">
                          {multipleImages.map((item) => {
                            return (
                              <>
                                {item.FilePath ? (
                                  <img src={"https://maktabq-api.jinnbytedev.com/" + item.FilePath} alt="" className="multiImage" />
                                ) : (
                                  <img src="./img/business-profile-image2.png" />
                                )}
                              </>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 business-profile-content">
                      <div className="row">
                        <div className="col-md-3 card-owner">
                          <h3 className="view-profile-name">Restaurant Name</h3>
                          <h4 className="view-profile-user-name">{businessinfos.Name}</h4>
                        </div>
                        <div className="col-md-3 ">
                          <h3 className="view-profile-name">Address</h3>
                          <h4 className="view-profile-user-name">{businessinfos.Address}</h4>
                        </div>
                        <div className="col-md-3 ">
                          <h3 className="view-profile-name">Email</h3>
                          <h4 className="view-profile-user-name">{businessinfos.Email}</h4>
                        </div>
                        <div className="col-md-3 ">
                          <h3 className="view-profile-name">Business Phone</h3>
                          <h4 className="view-profile-user-name">{businessinfos.Phone}</h4>
                        </div>
                        {/* <div className="col-md-3 ">
                      <h3 className="view-profile-name">Ratings</h3>
                      <h4 className="view-profile-user-star">
                        <span>4.6</span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </h4>
                    </div> */}
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Category</h3>
                            <h4 className="view-profile-user-name">{businessinfos.Category}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Area</h3>
                            <h4 className="view-profile-user-name">{businessinfos.Area}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Longitude</h3>
                            <h4 className="view-profile-user-name">{businessinfos.Longitude}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Latitude</h3>
                            <h4 className="view-profile-user-name">{businessinfos.Latitude}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">RSVP</h3>
                            <h4 className="view-profile-user-name">{businessinfos.RSVP}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Description</h3>
                            <h4 className="view-profile-user-name">{businessinfos.Description}</h4>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Rating</h3>
                            <h4 className="view-profile-user-name">{businessinfos.Rating}</h4>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="view-event-description">
                            <h3 className="view-profile-name">Privacy Policy Details</h3>
                            <h4 className="view-profile-user-name">{businessinfos.PrivacyPolicy}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 payment-col">
                      <div className="profile-business-features">
                        <h3 className="view-profile-payment">Features</h3>
                      </div>
                    </div>

                    <div className="view-profile-icons">
                      {feature.map((feature) => {
                        return (
                          <div className="business-icons">
                            <img
                              src={feature.Icon ? "https://maktabq-api.jinnbytedev.com/" + feature.Icon : "/img/images.png"}
                              className="featureselect_image"
                              alt="Icon"
                            />
                            <h4 className="business-icons-content">{feature.Name}</h4>
                          </div>
                        )
                      })}
                    </div>

                    <div className="col-md-12 payment-col">
                      <div className="profile-business-features">
                        <h3 className="view-profile-payment">Near By Places</h3>
                      </div>
                    </div>

                    <div className="form-group col-md-12 mb-0">
                      <div className="featureselect">
                        {nearByPlace?.map((item) => {
                          return (
                            <>
                              <div className="featureselect_column">
                                <label for={"placeselect-" + item.NearByPlaceId}>
                                  <div className="featureselect_feature">
                                    <img src={"https://maktabq-api.jinnbytedev.com" + item.InActiveImage} className="featureselect_image" alt="" />
                                    <h4 className="featureselect_title">{item.Title}</h4>
                                  </div>
                                </label>
                                <input
                                  id={"placeselect-" + item.NearByPlaceId}
                                  name={"placeselect-" + item.NearByPlaceId}
                                  className="nearPlace"
                                  type="checkbox"
                                  value={item.NearByPlaceId}
                                />
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                    <div className="col-md-12 payment-col">
                      <div className="profile-business-timing">
                        <h3 className="view-profile-payment">Business Timings</h3>
                      </div>
                    </div>

                    {timing.map((timing) => {
                      return (
                        <div className="col-md-3 timing_day">
                          <h3 className="view-profile-name">{timing.Day}</h3>
                          <h4 className="view-profile-user-name">
                            {" "}
                            {timing.StartTime.slice(0, 5)} to {timing.EndTime.slice(0, 5)}
                          </h4>
                        </div>
                      )
                    })}
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
export default ViewBusinessOwner
