import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Swal from "sweetalert2"

import Loader from "../../shared/Loader"
function EditService() {
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

    }

    return (
        <div>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="headertopbar">
                                <Link to="/ManageServices" className="headertopbar_title">
                                    {" "}
                                    <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Edit Service
                                </Link>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card_custom">
                                <form className="myform" onSubmit={handleSubmit}>
                                    <div className="form-row">

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username">Service Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter Service Name"

                                                />
                                                {emptyValidation.NameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Service name is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="email-container position-relative">
                                                <label htmlfor="uname" className="w-100 email-label">
                                                Price
                                                </label>
                                                <div>
                                                    <input
                                                       
                                                        type="number"
                                                        name="uname"
                                                        placeholder="Enter Email Address"
                                                        className="form_control"
                                                        

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
                                            Add Service Option
                                            </label>
                                            <textarea id="w3review" rows="1" cols="50"
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

                        <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
                            <div className="formbtncontainer">
                                <button type="submit" className="profile-business-accept btn btn-primary">
                                    Update
                                </button>
                                <Link to="/ManageServices" className="btn_primary btn_email_primary view_user_cancel">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}
export default EditService
