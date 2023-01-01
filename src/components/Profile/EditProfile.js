import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
<<<<<<< HEAD
import profilService from "../../services/ProfileService"

import Loader from "../../shared/Loader"

function EditProfile() {
	const profileservice = new profilService()

	const { UserId } = useParams()
	const history = useHistory()
	const [loader, setLoader] = useState(true)
	const [picture, setPicture] = useState(null)
	const [imgData, setImgData] = useState("/img/icon_upload_add_load (2).svg")
	const [btnLock, setBtnLock] = useState(false)
	const [emptyValidation, setEmptyValidation] = useState({
		profilePhotoEmpty: false,
		firstNameEmpty: "",
		lastNameEmpty: "",
		emailEmpty: "",
		phoneNumberEmpty: "",
		// passwordEmpty: "",
	})




	const [userData, setUserData] = useState({})


	const [dataCount, setDataCount] = useState(0)


	useEffect(() => {
		if (dataCount === 0) {
			getUserData()
			setDataCount(1)
		}
	}, [userData]) // eslint-disable-line react-hooks/exhaustive-deps

	const getUserData = async () => {

		debugger
		const response = await profileservice.getProfileUser(localStorage.getItem("AdminQuickTowId"))
		if (response.data.code === 1) {

			setUserData(response.data.data)
			setImgData(response.data.data.profilePhoto)

		}
	}






	const imagesPreview = (e) => {
		if (e.target.files[0]) {
			setPicture(e.target.files[0])
			const reader = new FileReader()
			reader.addEventListener("load", () => {
				setImgData(reader.result)
			})
			reader.readAsDataURL(e.target.files[0])
		}
	}
	const [confirmPassword, setConfirmPassword] = useState("")
	const deleteItem = () => {
		setPicture(null)
		setImgData(null)
	}
	const maxLengthCheck = (object) => {
		if (object.target.value.length > object.target.maxLength) {
			object.target.value = object.target.value.slice(0, object.target.maxLength)
		}
	}
	// const passwordhandler = () => {
	// 	const password = document.querySelector("#password")
	// 	// toggle the type attribute
	// 	const type = password.getAttribute("type") === "password" ? "text" : "password"
	// 	password.setAttribute("type", type)
	// }

	// const passwordhandlerconfirm = () => {
	// 	const password = document.querySelector("#confirm-password")
	// 	// toggle the type attribute
	// 	const type = password.getAttribute("type") === "password" ? "text" : "password"
	// 	password.setAttribute("type", type)
	// }
	const emailValid = () => {
		let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		var email = document.getElementById("email-address").value
		if (!pattern.test(email)) {
			document.querySelector("#tick-1").style.display = "none"
		} else {
			document.querySelector("#tick-1").style.display = "block"
		}
	}


	const handleSubmit = async (e) => {
		e.preventDefault()
		let validCount = 0
		let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		const c = { ...emptyValidation }


		if (userData.email === "") {
			c.emailEmpty = "Email is Required"
			validCount++
		} else if (!pattern.test(userData.email)) {
			validCount++
			c.emailEmpty = "Email should Be Valid"
		} else {
			c.emailEmpty = ""
		}

		// if (userData.password === "") {
		// 	c.passwordEmpty = true
		// 	validCount++
		// } else {
		// 	c.passwordEmpty = false
		// }


		if (userData.firstName === "") {
			c.firstNameEmpty = true
			validCount++
		} else {
			c.firstNameEmpty = false
		}
		if (userData.lastName === "") {
			c.lastNameEmpty = true
			validCount++
		} else {
			c.lastNameEmpty = false
		}

		if (userData.phoneNumber === "") {
			c.phoneNumberEmpty = true
			validCount++
		} else {
			c.phoneNumberEmpty = false
		}

		if (imgData === null) {
			c.profilePhotoEmpty = true
			validCount++
		} else {
			c.profilePhotoEmpty = false
		}


		setEmptyValidation(c)

		if (validCount > 0) {
			return
		}
		setBtnLock(true)

		debugger
		const response = await profileservice.updateProfile(userData)
		if (response.data.code === 1) {
			if (!(picture === null)) {
				const formData = new FormData()
				formData.append("file", picture)
				const imageResponse = await profileservice.uploadImage(formData, response.data.data.id)
				if (imageResponse.data.code === 1) {
					localStorage.setItem("AdminQuickTowImage", (imageResponse.data.data))
					history.push("/Profile")
					setBtnLock(false)
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Profile has been updated",
						showConfirmButton: true,
						timer: 5000,
					})
				}

				if (response.data.code === 0) {
					setBtnLock(false)
					Swal.fire({
						position: "center",
						icon: "error",
						title: imageResponse.data.data.message,
						showConfirmButton: true,
						timer: 5000,
					})
				}
			}

			else {
				history.push("/Profile")
				setBtnLock(false)
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Profile has been updated",
					showConfirmButton: true,
					timer: 5000,
				})
			}
		}
	}



	return (
		<div>
			<main>
				<div className="container-fluid">
					<form className="myform" onSubmit={handleSubmit} >
						<div className="row">
							<div className="col-12">

								<div className="headertopbar">
									<Link to="/Profile" className="headertopbar_title">
										{" "}
										<img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Edit Profile-User
									</Link>
								</div>
							</div>
							<div className="col-12 column_margin">
								<div className="card_custom">
									<h3 className="User_Profile_Name" style={{ paddingBottom: "30px" }}>User Details</h3>

									<div className="form-row">
										<div className="form-group col-md-12 form-group--uploadimage">
											<div className="file-upload position-relative">
												<div class="imagecontainer">
													<label for="upload-image" class="upload-image-label">
														<div className="file-pic">
															<h5 className="upload-image-title">Upload Image</h5>
															{imgData ? (
																<div class="uploadedimages">
																	<img
																		class="uploadedimage"
																		src={imgData}
																		alt="uploaded_image"
																	/>
																</div>
															) : (
																""
															)}
														</div>
													</label>
												</div>
												<input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
												{emptyValidation.profilePhotoEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}
												<div style={{ position: "relative" }}>
													<label for="upload-image"> <img src="/img/edit (1).svg" alt="" className="edit_img" /></label>
												</div>
											</div>
										</div>

										<div className="form-group col-md-4">
											<div className="name">
												<label htmlfor="username">First Name</label>
												<input
													type="text"
													name="username"
													className="form_control"
													placeholder="Enter Name"
													onChange={(e) => {
														const x = { ...userData }
														x.firstName = e.target.value
														setUserData(x)
													}}
													value={userData.firstName}

												/>
												{emptyValidation.firstNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="name">
												<label htmlfor="username">Last Name</label>
												<input
													type="text"
													name="username"
													className="form_control"
													placeholder="Enter Name"
													onChange={(e) => {
														const x = { ...userData }
														x.lastName = e.target.value
														setUserData(x)
													}}
													value={userData.lastName}

												/>
												{emptyValidation.lastNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="email-container position-relative">
												<label htmlfor="uname" className="w-100 email-label">
													Email
												</label>
												<div>
													<div className="tick-icon-absolute">
														<input
															onKeyUp={emailValid}
															type="text"
															name="uname"
															placeholder="Enter Email Address"
															className="form_control"
															id="email-address"
															onChange={(e) => {
																const x = { ...userData }
																x.email = e.target.value
																setUserData(x)
															}}
															value={userData.email}

														/>
														<img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
													</div>
												</div>
												{emptyValidation.emailEmpty.length !== 0 ? (
													<p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.emailEmpty} </p>
												) : (
													""
												)}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="phone-container position-relative">
												<label htmlfor="tel" className="number-label">
													Phone Number
												</label>
												<input
													type="number"
													placeholder="Enter PhoneNumber"
													maxLength="11"
													onInput={maxLengthCheck}

													className="form_control"
													onChange={(e) => {
														const x = { ...userData }
														x.phoneNumber = e.target.value
														setUserData(x)
													}}
													value={userData.phoneNumber}

												/>
												{emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
											</div>
										</div>
										{/* <div className="form-group col-md-4">
											<div className="password-container position-relative">
												<label htmlfor="pwd" className="100">
													Password
												</label>
												<div>
													<div className="tick-icon-absolute">
														<input
															type="password"
															name="pwd"
															className="form_control"
															id="password"
															placeholder="Enter Password"
														/>

														<div className="eye-icon">
															<img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandler} />
														</div>
													</div>
												</div>
												{emptyValidation.passwordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password is required </p> : ""}
											</div>
										</div> */}


									</div>


								</div>

							</div>


							{/* <div className="col-12 column_margin">
                            <div className="card_custom">
                                <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Update Password</h3>
                            
                                    <div className="form-row">

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username">Current Password</label>
                                                <input
                                                    type="password"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter your Current Password"

                                                />
                                                {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Current password is required</p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="email-container position-relative">
                                                <label htmlfor="uname" className="w-100 email-label">
                                                    New Password
                                                </label>
                                                <div>
                                                    <input

                                                        type="password"
                                                        name="uname"
                                                        placeholder="Enter Your New Password"
                                                        className="form_control"
                                                        id="email-address"

                                                    />
                                                    <div className="tick-icon-absolute">
                                                        <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
                                                    </div>
                                                </div>
                                                {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>New password is required</p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="phone-container position-relative">
                                                <label htmlfor="tel" className="number-label">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    placeholder="Confirm password"
                                                    className="form_control"

                                                />
                                                {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}></p> : ""}
                                            </div>
                                        </div>
                                    </div>
                               
                            </div>
                        </div> */}
							{/* update password end */}

							{/* 
						<div className="col-12 column_margin">
							<div className="card_custom">
							
                        <h3 className="User_Profile_Name" style={{paddingBottom: "50px"}}>Account Details</h3>
  
							
									<div className="form-row">
									

										<div className="form-group col-md-4">
											<div className="name">
												<label htmlfor="username">Bank Name</label>
												<input
													type="text"
													name="username"
													className="form_control"
													placeholder="Enter Bank Name"
												
												/>
												
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="email-container position-relative">
												<label htmlfor="uname" className="w-100 email-label">
                                                Account Name
												</label>
												<div>
													<input
														
														type="text"
														name="uname"
														placeholder="Enter Account Name"
														className="form_control"
														id="email-address"
												
													/>
													<div className="tick-icon-absolute">
														<img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
													</div>
												</div>
												
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="phone-container position-relative">
												<label htmlfor="tel" className="number-label">
                                                Account Number
												</label>
												<input
													type="text"
													placeholder="Enter Account Number"
													className="form_control"
												
												/>
												
											</div>
										</div>
									</div> */}


						</div>
						<div className="form-group col-md-12 formbtncontainer__outercontainer--layout3" style={{ paddingBottom: "50px" }}>
							<div className="formbtncontainer">
								<button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
									Update {btnLock ? <div className="btnloader">{Loader}</div> : ""}
								</button>
								<Link to="/Profile" className="btn_primary btn_email_primary view_user_cancel">
									Cancel
								</Link>
							</div>
						</div>


					</form>
				</div>
			</main>
		</div>
	)
=======
// import AuthService from "../../services/AuthService"
import ProfileService from "../../services/ProfileService"
import UsersService from "../../services/UsersService"

import Loader from "../../shared/Loader"
function EditProfile() {
  //State
  const history = useHistory()
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
  const [picture, setPicture] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [btnLock, setBtnLock] = useState(false)

  const [user, setUser] = useState({
    UserId: JSON.parse(localStorage.getItem("makhtabquserId")),
    Name: "",
    Email: "",
    Phone: "",
    ProfilePicture: "",
    Password: "",
    UpdatedBy: JSON.parse(localStorage.getItem("makhtabquserId")),
  })
  const [emptyValidation, setEmptyValidation] = useState({
    imageEmpty: false,
    NameEmpty: false,
    EmailEmpty: "",
    PhoneEmpty: false,
    PasswordEmpty: false,
  })
  // SERVICES
  const profileService = new ProfileService()
  const usersService = new UsersService()

  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getProfile()
      setLoader(false)
      setDataCount(1)
    }
  }, [user, dataCount, imgData]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const imagesPreview = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0])
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const [confirmPassword, setConfirmPassword] = useState("")
  const deleteItem = () => {
    setPicture(null)
    setImgData(null)
  }
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }
  const passwordhandler = () => {
    const password = document.querySelector("#password")
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password"
    password.setAttribute("type", type)
  }

  const passwordhandlerconfirm = () => {
    const password = document.querySelector("#confirm-password")
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password"
    password.setAttribute("type", type)
  }
  const emailValid = () => {
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    var email = document.getElementById("email-address").value
    if (!pattern.test(email)) {
      document.querySelector("#tick-1").style.display = "none"
    } else {
      document.querySelector("#tick-1").style.display = "block"
    }
  }

  const getProfile = async () => {
    debugger
    const response = await profileService.getById(JSON.parse(localStorage.getItem("makhtabquserId")))
    setUser(response.data.Data)
    setImgData(response.data.Data.ProfilePicture)
    setLoader(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let validCount = 0
    let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const c = { ...emptyValidation }
    if (imgData === null) {
      c.imageEmpty = true
      validCount++
    } else {
      c.imageEmpty = false
    }

    if (user.Name === "") {
      c.NameEmpty = true
      validCount++
    } else {
      c.NameEmpty = false
    }

    if (user.Email === "") {
      c.EmailEmpty = "Email is required"
      validCount++
    } else if (!pattern.test(user.Email)) {
      validCount++
      c.EmailEmpty = "Email should be valid"
    } else {
      c.EmailEmpty = ""
    }

    if (user.Phone === "") {
      c.PhoneEmpty = true
      validCount++
    } else {
      c.PhoneEmpty = false
    }

    if (user.Password === "") {
      c.PasswordEmpty = true
      validCount++
    } else {
      c.PasswordEmpty = false
    }

    if (user.Password !== confirmPassword) {
      c.confirmPasswordEmpty = true
      validCount++
    } else {
      c.confirmPasswordEmpty = false
    }

    setEmptyValidation(c)

    if (validCount > 0) {
      return
    }
    setBtnLock(true)

    const response = await profileService.update(user)
    debugger
    if (response.data.Code === 1) {
      if (!(picture === null)) {
        const formData = new FormData()
        formData.append("id", localStorage.getItem("makhtabquserId"))
        formData.append("profile_picture", picture)
        const imageResponse = await usersService.uploadImage(formData)
        if (imageResponse.data.Code === 1) {
          history.push("/Profile")
          setBtnLock(false)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Admin has been Updated",
            showConfirmButton: true,
            timer: 5000,
          })
        }

        if (imageResponse.data.Code === 0) {
          setBtnLock(false)
          Swal.fire({
            position: "center",
            icon: "error",
            title: imageResponse.data.Data.Message,
            showConfirmButton: true,
            timer: 5000,
          })
        }
      } else {
        history.push("/Profile")
        setBtnLock(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User has been Updated",
          showConfirmButton: true,
          timer: 5000,
        })
      }
    }

    if (response.data.Code === 0) {
      setBtnLock(false)

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
                <Link to="/ManageUser" className="headertopbar_title">
                  {" "}
                  <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.png" /> Edit User
                </Link>
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
                {loader ? (
                  Loader
                ) : (
                  <form className="myform" onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-12 form-group--uploadimage">
                        <div className="file-upload position-relative">
                          <div class="imagecontainer">
                            <label for="upload-image" class="upload-image-label">
                              <div className="file-pic">
                                <h5 className="upload-image-title">Upload Image</h5>

                                <img src="/img/icon_upload_add_load@2x.png" id="image-icon" alt="upload_image" />
                              </div>
                              <img id="cross-icon" alt="delete_image" src="/img/cancel.svg" />
                            </label>
                            {imgData ? (
                              <div class="uploadedimages">
                                <img
                                  class="uploadedimage"
                                  src={picture ? imgData : "https://maktabq-api.jinnbytedev.com" + imgData}
                                  alt="uploaded_image"
                                />
                                <img onClick={deleteItem} class="delete_upload_image" alt="delete_uploaded_image" src="/img/cancel.svg" />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <input onChange={imagesPreview} id="upload-image" name="upload-image" hidden type="file" accept=".png, .jpg, .jpeg" />
                          {emptyValidation.imageEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Image is required </p> : ""}
                        </div>
                      </div>

                      <div className="form-group col-md-4">
                        <div className="name">
                          <label htmlfor="username">Full Name</label>
                          <input
                            type="text"
                            name="username"
                            className="form_control"
                            placeholder="Enter Name"
                            value={user.Name}
                            onChange={(e) => {
                              const x = { ...user }
                              x.Name = e.target.value
                              setUser(x)
                            }}
                          />
                          {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <div className="email-container position-relative">
                          <label htmlfor="uname" className="w-100 email-label">
                            Email
                          </label>
                          <div>
                            <div className="position_relative">
                              <input
                                disabled
                                onKeyUp={emailValid}
                                type="text"
                                name="uname"
                                placeholder="Enter Email Address"
                                className="form_control"
                                id="email-address"
                                onChange={(e) => {
                                  const x = { ...user }
                                  x.Email = e.target.value
                                  setUser(x)
                                }}
                                value={user.Email}
                              />
                              <img className="tick_icon_email" src="./img/CorrectSvg.svg" id="tick-1" alt="tickicon" />
                            </div>
                          </div>
                          {emptyValidation.EmailEmpty.length !== 0 ? (
                            <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.EmailEmpty} </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <div className="phone-container position-relative">
                          <label htmlfor="tel" className="number-label">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            placeholder="Enter PhoneNumber"
                            maxLength="11"
                            onInput={maxLengthCheck}
                            selected={user.Phone}
                            className="form_control"
                            onChange={(e) => {
                              const x = { ...user }
                              x.Phone = e.target.value
                              setUser(x)
                            }}
                            value={user.Phone}
                          />
                          {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <div className="password-container position-relative">
                          <label htmlfor="pwd" className="100">
                            Password
                          </label>
                          <div>
                            <div className="position_relative">
                              <input
                                type="password"
                                name="pwd"
                                className="form_control"
                                id="password"
                                placeholder="Enter Password"
                                onChange={(e) => {
                                  const x = { ...user }
                                  x.Password = e.target.value
                                  setUser(x)
                                }}
                                value={user.Password}
                              />
                              <div className="eye-icon">
                                <img alt="eye" src="/img/visibilitySvg.svg" className="eye_Icon" id="toggle-password" onClick={passwordhandler} />
                              </div>
                            </div>
                          </div>
                          {emptyValidation.PasswordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password is required </p> : ""}
                        </div>
                      </div>

                      <div className="form-group col-md-4">
                        <div className="password-container position-relative">
                          <label htmlfor="pwd" className="100">
                            Confirm Password
                          </label>
                          <div>
                            <div className="position_relative">
                              <input
                                type="password"
                                name="pwd"
                                className="form_control"
                                id="confirm-password"
                                placeholder="Enter Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                              />

                              <div className="eye-icon">
                                <img
                                  alt="eye"
                                  src="/img/visibilitySvg.svg"
                                  className="eye_Icon"
                                  id="toggle-password"
                                  onClick={passwordhandlerconfirm}
                                />
                              </div>
                            </div>
                          </div>

                          {emptyValidation.confirmPasswordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password not matching </p> : ""}
                        </div>
                      </div>
                      <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
                        <div className="formbtncontainer">
                          <button disabled={btnLock} type="submit" className="btn_primary submitbtn">
                            Save
                            {btnLock ? <div class="btnloader">{Loader}</div> : ""}
                          </button>
                          <Link to="/Profile" className="btn_primary_outline cancelbtn">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
}
export default EditProfile
