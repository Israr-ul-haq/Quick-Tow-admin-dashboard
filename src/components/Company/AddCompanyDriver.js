import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import Loader from "../../shared/Loader"
function AddCompanyDriver() {
    //State
    const { UserId } = useParams()
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

    
    return (
        <div>
            <main>
                <div className="container-fluid" style={{paddingBottom: "50px"}}>
                    <div className="row">
                        <div className="col-12">
                            <div className="headertopbar">
                                <Link to="/ManageCompanyDrivers" className="headertopbar_title">
                                    {" "}
                                    <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Add New Company Trucker
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
                                                <label htmlfor="username">First Name</label>
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
                                            <div className="name">
                                                <label htmlfor="username">Last Name</label>
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
                                        <div className="form-group col-md-4">
                                            <div className="password-container position-relative">
                                                <label htmlfor="pwd" className="100">
                                                    Password
                                                </label>
                                                <div>
                                                    <input
                                                        type="password"
                                                        name="pwd"
                                                        className="form_control"
                                                        id="password"
                                                        placeholder="Enter Password"

                                                    />
                                                    <div className="tick-icon-absolute">
                                                        <div className="eye-icon">
                                                            <img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandler} />
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
                                                    <input
                                                        type="password"
                                                        name="pwd"
                                                        className="form_control"
                                                        id="confirm-password"
                                                        placeholder="Enter Password"
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        value={confirmPassword}
                                                    />
                                                    <div className="tick-icon-absolute">
                                                        <div className="eye-icon">
                                                            <img alt="eye" src="/img/visibility.png" className="eye" id="toggle-password" onClick={passwordhandlerconfirm} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {emptyValidation.confirmPasswordEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Password not matching </p> : ""}
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>


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
                                                    placeholder="Enter Name"

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
                                                    Vehicle Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="City"
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
                        </div>

                    </div>

                    {/* Vahicle Cars End */}

                    {/* Attached Document Start */}
                    <div className="column_margin">
                    

                    <div className="card_custom">
                        <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Attach Documents</h3>
                        <form className="myform" >
                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username">Driver Licence</label>
                                        <input
                                                type="file"
                                                className="form_control form_control_file"
                                            />
                                        {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Name is required </p> : ""}
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <div className="email-container position-relative">
                                        <label htmlfor="uname" className="w-100 email-label">
                                        Vehicle Insurance
                                        </label>
                                        <div>
                                            <input
                                                type="file"
                                                className="form_control form_control_file"
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
                                <div className="form-group col-md-12">
                                    <div className="phone-container position-relative">
                                        <label htmlfor="tel" className="number-label">
                                        Insurance Information
                                        </label>
                                        <textarea id="w3review"  rows="30" cols="50" 
                                        placeholder="here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                                        className="form_control text_area_input" style={{height: "80px"}}>
                                            </textarea>

                                        
                                        {emptyValidation.PhoneEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                    </div>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                  </div>

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
                 
                    


                    {/* Attached Documents End */}

                    <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
                        <div className="formbtncontainer">
                            <button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
                                Save 
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
export default AddCompanyDriver
