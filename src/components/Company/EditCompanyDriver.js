import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import Loader from "../../shared/Loader"

function EditCompanyDriver() {
    //State
    const { companyId } = useParams()
    const [user, setUser] = useState({})
    const history = useHistory()
    const [subAdminCount, setSubAdminCount] = useState(0)
    const [loader, setLoader] = useState(true)
    const [picture, setPicture] = useState(null)
    const [imgData, setImgData] = useState(null)
    const [btnLock, setBtnLock] = useState(false)
    const [emptyValidation, setEmptyValidation] = useState({
        imageEmpty: false,
        NameEmpty: false,
        EmailEmpty: "",
        PhoneEmpty: false,
        PasswordEmpty: false,
    })
    // SERVICES


    //UseEffect
    // useEffect(() => {
    //   if (subAdminCount === 0) {
    //     getEvent()
    //     setSubAdminCount(1)
    //   }
    // }, [user, subAdminCount, imgData]) // eslint-disable-line react-hooks/exhaustive-deps

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
            c.EmailEmpty = "Email is Required"
            validCount++
        } else if (!pattern.test(user.Email)) {
            validCount++
            c.EmailEmpty = "Email Should Be Valid"
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
        //   const finalSubAdmin = {
        //     Name: "",
        //     Email: "",
        //     Phone: "",
        //     Password: "",
        //     UserTypeId: 5,
        //     ProfilePicture: "",
        //     UpdatedBy: 4,
        //     UserId: UserId,
        //   }
        //   finalSubAdmin.Name = user.Name
        //   finalSubAdmin.Email = user.Email
        //   finalSubAdmin.Phone = user.Phone
        //   finalSubAdmin.Password = user.Password
        //   finalSubAdmin.ProfilePicture = user.ProfilePicture
        //   const response = await userService.update(finalSubAdmin)

        //   if (response.data.Code === 1) {
        //     if (!(picture === null)) {
        //       const formData = new FormData()
        //       formData.append("id", response.data.Data.UserId)
        //       formData.append("profile_picture", picture)
        //       const imageResponse = await userService.uploadImage(formData)
        //       if (imageResponse.data.Code === 1) {
        //         history.push("/ManageUser")
        //         setBtnLock(false)

        //         Swal.fire({
        //           position: "center",
        //           icon: "success",
        //           title: "User has been Updated",
        //           showConfirmButton: true,
        //           timer: 5000,
        //         })
        //       }

        //       if (imageResponse.data.Code === 0) {
        //         setBtnLock(false)
        //         Swal.fire({
        //           position: "center",
        //           icon: "error",
        //           title: imageResponse.data.Data.Message,
        //           showConfirmButton: true,
        //           timer: 5000,
        //         })
        //       }
        //     } else {
        //       history.push("/ManageUser")
        //       setBtnLock(false)

        //       Swal.fire({
        //         position: "center",
        //         icon: "success",
        //         title: "User has been Updated",
        //         showConfirmButton: true,
        //         timer: 5000,
        //       })
        //     }
        //   }

        //   if (response.data.Code === 0) {
        //     setBtnLock(false)

        //     Swal.fire({
        //       position: "center",
        //       icon: "error",
        //       title: response.data.Data.Message,
        //       showConfirmButton: true,
        //       timer: 5000,
        //     })
        //   }
        // }
        // const getEvent = async () => {
        //   const response = await userService.getById(UserId)
        //   console.log(response)
        //   if (response.data.Code === 1) {
        //     setUser(response.data.Data)
        //     setImgData(response.data.Data.ProfilePicture)
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
    }

    return (
        <div>
            <main>
                {/* person Details start */}
                <div className="container-fluid" style={{ paddingBottom: "50px" }}>
                    <div className="row">
                        <div className="col-12">
                            <div className="headertopbar">
                                <Link to="/ManageCompanyDrivers" className="headertopbar_title">
                                    {" "}
                                    <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Edit Company Profile- Truckers
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 column_margin">
                            <div className="card_custom">
                                <h3 className="User_Profile_Name" style={{ paddingBottom: "30px" }}>User Details</h3>
                                <form className="myform" >
                                    <div className="form-row">
                                        <div className="form-group col-md-12 form-group--uploadimage">
                                            <div className="file-upload position-relative">
                                                <div class="imagecontainer">
                                                    <label for="upload-image" class="upload-image-label">
                                                        <div className="file-pic">
                                                            <h5 className="upload-image-title">Upload Image</h5>

                                                            <img src="/img/icon_upload_add_load.png" id="image-icon" alt="upload_image" />
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
                                                    <input
                                                        onKeyUp={emailValid}
                                                        type="text"
                                                        name="uname"
                                                        placeholder="Enter Email Address"
                                                        className="form_control"
                                                        id="email-address"

                                                    />
                                                    <div className="tick-icon-absolute">
                                                        <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
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

                                                />
                                                {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                            </div>
                                        </div>
                                       


                                    </div>
                                </form>

                            </div>

                        </div>
                        {/* person detail End */}



                        {/* update password start */}

                        <div className="col-12 column_margin">
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
                        </div>
                        {/* update password end */}





                        {/* Vahicle Card Start */}

                        <div className="col-12 column_margin">
                            <div className="card_custom">
                                <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Vehicle Details</h3>
                                <form className="myform" >
                                    <div className="form-row">

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Vehicle Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter Vahicle Name"

                                                />
                                                {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="email-container position-relative">
                                                <label htmlfor="uname" className="w-100 email-label">
                                                    Vehicle Model
                                                </label>
                                                <div>
                                                    <input
                                                        onKeyUp={emailValid}
                                                        type="text"
                                                        name="uname"
                                                        placeholder="Enter Vahicle Model"
                                                        className="form_control"
                                                        id="email-address"

                                                    />
                                                    <div className="tick-icon-absolute">
                                                        <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
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
                                                    Vehicle Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Vahicle Number"
                                                    selected={user.Phone}
                                                    className="form_control"

                                                />
                                                {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="password-container position-relative">
                                                <label htmlfor="pwd" className="100">
                                                    Vehicle Category
                                                </label>
                                                <div>
                                                    <select name="dog-names" id="dog-names" className="form_control">
                                                        <option value="md122">Truck 1</option>
                                                        <option value="">Truck 2</option>
                                                        <option value="">Truck 3</option>
                                                        <option value="">Truck 4</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* Vahicle Cars End */}
                        </div>

                        <div className="col-12 column_margin">
                            <div className="card_custom" style={{padding: "30px"}}>
                                <div className="vahicle_section">
                                    <img src="/img/Icon feather-plus.svg" alt="plus" />
                                    <p className="vahicle_title">Add Vahicle</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* Attached Document Start */}
                    <div className="column_margin">
                        <div className="card_custom">
                            <h3 className="User_Profile_Name" style={{ paddingBottom: "40px" }}>Attach Documents</h3>
                            <form className="myform" >
                                <div className="form-row">
                                    <div className="col-md-12">
                                        <div className="section_images" style={{ paddingBottom: "20px" }}>

                                            <div className="position_relative_card">
                                                <img src="/img/pic_edit.svg" alt="edit" className="edit_position_absolute" />
                                            </div>
                                            <img alt="id" src="/img/Insurance info.png" className="doc_Sec_img" />

                                            <div className="position_relative_card">
                                                <img src="/img/pic_edit.svg" alt="edit" className="edit_position_absolute" />
                                            </div>
                                            <img alt="license" src="/img/License.png" className="doc_Sec_img" />
                                        </div>
                                    </div>



                                    <div className="form-group col-md-12">
                                        <div className="phone-container position-relative">
                                            <label htmlfor="tel" className="number-label">
                                                Insurance Information
                                            </label>
                                            <textarea id="w3review" rows="30" cols="50"
                                                placeholder="here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                                                className="form_control text_area_input" style={{ height: "80px" }}>
                                            </textarea>


                                            {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Attached Documents End */}
                    <div className="card_custom">
                        <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Account information</h3>
                        <form className="myform" >
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username">Bank Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="Bank of USA"

                                        />
                                        {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Company website is required </p> : ""}
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username"> Account Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="Regular Account"

                                        />
                                        {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}> Account Name is required </p> : ""}
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username">Account Number</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="XXX-XXX-XXX"
                                        />
                                        {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Account Number </p> : ""}
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>



                    <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
                        <div className="formbtncontainer">
                            <button type="submit" className="profile-business-accept btn btn-primary">
                                Update
                            </button>
                            <Link to="/ManageCompanyDrivers" className="btn_primary btn_email_primary view_user_cancel">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>




            </main>
        </div>
    )
}
export default EditCompanyDriver
