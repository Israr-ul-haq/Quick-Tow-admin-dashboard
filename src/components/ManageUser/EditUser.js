import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"
import profilService from "../../services/ProfileService"
import UsersService from "../../services/UsersService"


import Loader from "../../shared/Loader"
function EditUser() {
	//State
	const userService = new UsersService()
	const ProfileService = new profilService()
	const { id } = useParams()
	const [userData, setUserData] = useState({
		id: id,
		email: "mazhar1@jinnbyte.com",
		firstName: "mazhar 2",
	     lastName: "khan 2",
		phoneNumber: "90233023021012",
		vehicles : []
	})
	const history = useHistory()
	const [dataCount, setDataCount] = useState(0)
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
		makeEmpty: "",
		modelEmpty:"",
		licensePlateNumberEmpty: "",
		transmissionTypeId: "",
	})
	const [vehicleData, setVehicleData] = useState({})
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
	// const [confirmPassword, setConfirmPassword] = useState("")
	// const deleteItem = () => {
	// 	setPicture(null)
	// 	setImgData(null)
	// }
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
		debugger
		e.preventDefault()
		let validCount = 0
		let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		const c = { ...emptyValidation }


		if (userData.email === "") {
			c.emailEmpty = "Email is required"
			validCount++
		} else if (!pattern.test(userData.email)) {
			validCount++
			c.emailEmpty = "Email should be valid"
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
		if (userData.make === "") {
			c.makeEmpty = true
			validCount++
		} else {
			c.makeEmpty = false
		}
		if (userData.model === "") {
			c.modelEmpty = true
			validCount++
		} else {
			c.modelEmpty = false
		}
		if (userData.licensePlateNumber === "") {
			c.licensePlateNumberEmpty = true
			validCount++
		} else {
			c.licensePlateNumberEmpty = false
		}
		if (userData.transmissionTypeId === 0) {
			c.transmissionTypeIdEmpty = true
			validCount++
		} else {
			c.transmissionTypeIdEmpty = false
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

		userData.vehicles = []
        userData.vehicles.push(vehicleData)
		const finalUsers = {}
		finalUsers.firstName = userData.firstName
		finalUsers.id = id
		finalUsers.email = userData.email
		finalUsers.lastName = userData.lastName
		finalUsers.phoneNumber = userData.phoneNumber
		finalUsers.vehicles = [{
			"make":  userData.vehicles[0].make,
            "model":  userData.vehicles[0].model,
            "licensePlateNumber": userData.vehicles[0].licensePlateNumber,
            "transmissionTypeId":  userData.vehicles[0].transmissionTypeId,
		}]
	



		debugger
		const response = await userService.update(finalUsers)
		if (response.data.code === 1) {
			if (!(picture === null)) {
				const formData = new FormData()
				formData.append("file", picture)
				const imageResponse = await ProfileService.uploadImage(formData, id)
				if (imageResponse.data.code === 1) {
					history.push("/UserManagement")
					setBtnLock(false)
					Swal.fire({
						position: "center",
						icon: "success",
						title: "User has been updated",
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
				history.push("/UserManagement")
				setBtnLock(false)
				Swal.fire({
					position: "center",
					icon: "success",
					title: "User has been updated",
					showConfirmButton: true,
					timer: 5000,
				})
			}
		}
	}


	useEffect(() => {
		if (dataCount === 0) {
			getUserData()
			setDataCount(1)
		}
	}, [userData]) // eslint-disable-line react-hooks/exhaustive-deps




	const getUserData = async () => {

		debugger
		const response = await userService.getById(id)
		if (response.data.code === 1) {
			setUserData(response.data.data[0])
			setVehicleData(response.data.data[0].vehicles[0])
			setImgData(response.data.data[0].profilePhoto)
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
									<Link to="/UserManagement" className="headertopbar_title">
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
									</div>


								</div>

							</div>


							{/* <div className="col-12 column_margin">
							<div className="card_custom">
								<h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Update Password</h3>
								<form className="myform" >
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
								</form>
							</div>
						</div> */}
							{/* update password end */}


							<div className="col-12 column_margin">
								<div className="card_custom">

									<h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Vehicle Details</h3>


									<div className="form-row">


										<div className="form-group col-md-4">
											<div className="name">
												<label htmlfor="username">Vehicle Name</label>
												<input
													type="text"
													name="username"
													className="form_control"
													placeholder="Enter Vahicle Name"
													onChange={(e) => {
														const x = { ...userData }
														x.make = e.target.value
														setVehicleData(x)
													}}
													value={vehicleData.make}

												/>
												{emptyValidation.makeNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle name is required </p> : ""}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="email-container position-relative">
												<label htmlfor="uname" className="w-100 email-label">
													Vehicle Model
												</label>
												<div>
													<input

														type="text"
														name="uname"
														placeholder="Enter Vahicle Model"
														className="form_control"
														id="email-address"
														onChange={(e) => {
															const x = { ...userData }
															x.model = e.target.value
															setVehicleData(x)
														}}
														value={vehicleData.model}

													/>
												</div>
												{emptyValidation.modelNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle model is required </p> : ""}

											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="phone-container position-relative">
												<label htmlfor="tel" className="number-label">
													Vehicle Number
												</label>
												<input
													type="text"
													placeholder="Enter Vahicle Number"

													className="form_control"
													onChange={(e) => {
														const x = { ...userData }
														x.model = e.target.value
														setVehicleData(x)
													}}
													value={vehicleData.licensePlateNumber}
												/>
												{emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Vehicle number is required </p> : ""}
											</div>
										</div>
										<div className="form-group col-md-4">
											<div className="password-container position-relative">
												<label htmlfor="pwd" className="100">
													Vehicle Category
												</label>
												<div>
													<select 
													onChange={(e) => {
														const c = { ...vehicleData }
														c.transmissionTypeId = e.target.value
														setVehicleData(c)
													}} className="form_control">
														<option value="0" selected>Select Vehicle Type</option>
														<option selected={vehicleData.transmissionTypeId === 1 ? "true" : "false"}>AWD</option>
														<option selected={vehicleData.transmissionTypeId === 2 ? "true" : "false"}>FWD</option>
													</select>
												</div>
											</div>
										</div>
									</div>

								</div>
								<div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
									<div className="formbtncontainer">
										<button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
											Update {btnLock ? <div className="btnloader">{Loader}</div> : ""}
										</button>
										<Link to="/UserManagement" className="btn_primary btn_email_primary view_user_cancel">
											Cancel
										</Link>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</main>
		</div>
	)
}
export default EditUser
