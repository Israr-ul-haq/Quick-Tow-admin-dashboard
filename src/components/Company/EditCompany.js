import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import CompanyService from "../../services/CompanyService"
import Loader from "../../shared/Loader"
function EditCompany() {
    //State
    const history = useHistory()
    const { userId } = useParams()
    const [picture, setPicture] = useState(null)
    const [loader, setLoader] = useState(true)
    const [dataCount, setDataCount] = useState(0)
    const [btnLock, setBtnLock] = useState(false)
    const [imgData, setImgData] = useState("/img/icon_upload_add_load (2).svg")
    const [user, setUser] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        profilePhoto: imgData,
        companies: [],
        accounts: []
    })

    const [company, setCompany] = useState({
        companyName: "",
        companyEmail: "",
        companyPhoneNumber: "",
        address: "",
        website: ""

    })

    const [account, setAccount] = useState({
        bankName: "",
        accountName: "",
        accountNumber: ""
    })

    const [emptyValidation, setEmptyValidation] = useState({
        profilePhotoEmpty: false,
        firstNameEmpty: "",
        lastNameEmpty: "",
        emailEmpty: "",
        phoneEmpty: "",
        passwordEmpty: "",
        confirmPasswordEmpty: "",
        phoneNumberEmpty: "",
        companyNameEmpty: "",
        companyEmailEmpty: "",
        companyPhoneNumberEmpty: "",
        addressEmpty: "",
        bankNameEmpty: "",
        accountNameEmpty: "",
        accountNumberEmpty: "",
    })

    // SERVICES



    useEffect(() => {
        if (dataCount === 0) {
            getCompany()
            setDataCount(1)
        }
    }, [user, imgData]) // eslint-disable-line react-hooks/exhaustive-deps

    //Functions
    const companyService = new CompanyService()

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


    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
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
        debugger
        e.preventDefault()
        let validCount = 0
        let pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const c = { ...emptyValidation }


        if (user.email === "") {
            c.emailEmpty = "Email is Required"
            validCount++
        } else if (!pattern.test(user.email)) {
            validCount++
            c.emailEmpty = "Email should Be Valid"
        } else {
            c.emailEmpty = ""
        }


        if (user.firstName === "") {
            c.firstNameEmpty = true
            validCount++
        } else {
            c.firstNameEmpty = false
        }
        if (user.lastName === "") {
            c.lastNameEmpty = true
            validCount++
        } else {
            c.lastNameEmpty = false
        }

        if (user.phoneNumber === "") {
            c.phoneNumberEmpty = true
            validCount++
        } else {
            c.phoneNumberEmpty = false
        }

        if (user.imgData === null) {
            c.profilePhotoEmpty = true
            validCount++
        } else {
            c.profilePhotoEmpty = false
        }

        if (company.companyName === "") {
            c.companyNameEmpty = true
            validCount++
        } else {
            c.companyNameEmpty = false
        }
        if (company.companyEmail === "") {
            c.companyEmailEmpty = "Email is required"
            validCount++
        } else if (!pattern.test(company.companyEmail)) {
            validCount++
            c.companyEmailEmpty = "Email should be valid"
        } else {
            c.companyEmailEmpty = ""
        }


        if (company.companyPhoneNumber === "") {
            c.companyPhoneNumberEmpty = true
            validCount++
        } else {
            c.companyPhoneNumberEmpty = false
        }
        if (company.address === "") {
            c.addressEmpty = true
            validCount++
        } else {
            c.addressEmpty = false
        }
        if (account.bankName === "") {
            c.bankNameEmpty = true
            validCount++
        } else {
            c.bankNameEmpty = false
        }
        if (account.accountName === "") {
            c.accountNameEmpty = true
            validCount++
        } else {
            c.accountNameEmpty = false
        }
        if (account.accountNumber === "") {
            c.accountNumberEmpty = true
            validCount++
        } else {
            c.accountNumberEmpty = false
        }
        setEmptyValidation(c)

        if (validCount > 0) {
            return
        }
        setBtnLock(true)
        user.companies = []
        user.accounts = []
        user.companies.push(company)
        user.accounts.push(account)
        const response = await companyService.updateCompany(user)
        debugger
        if (response.data.code === 1) {
            if (!(picture === null)) {
                const formData = new FormData()
                formData.append("file", picture)
                const imageResponse = await companyService.uploadImage(formData, userId)
                if (imageResponse.data.code === 1) {
                    history.push("/ManageCompany")
                    setBtnLock(false)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Company has been added",
                        showConfirmButton: true,
                        timer: 5000,
                    })
                }
    
                if (imageResponse.data.code === 0) {
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
            else{
                history.push("/ManageCompany")
                setBtnLock(false)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Company has been added",
                    showConfirmButton: true,
                    timer: 5000,
                })
            }
        }
    }


    const getCompany = async () => {
        const response = await companyService.getById(userId)
        debugger
        console.log(response)
        if (response.data.code === 1) {
            setUser(response.data.data)
            setCompany(response.data.data.companies[0])
            setAccount(response.data.data.accounts[0])
            setImgData(response.data.data.profilePhoto)
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
                <form className="myform" onSubmit={handleSubmit}>
                    <div className="container-fluid" style={{ paddingBottom: "50px" }} >
                        <div className="row">
                            <div className="col-12">
                                <div className="headertopbar">
                                    <Link to="/ManageCompany" className="headertopbar_title">
                                        {" "}
                                        <img className="headertopbar__arrowimage" alt="back arrow" src="./img/Icon ionic-ios-arrow-back.svg" /> Edit Company
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 column_margin">
                                <div className="card_custom">
                                    <h3 className="User_Profile_Name" style={{ paddingBottom: "30px" }}>Personal Information</h3>
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

                                                        const x = { ...user }
                                                        x.firstName = e.target.value
                                                        setUser(x)
                                                    }}
                                                    value={user.firstName}

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
                                                        const c = { ...user }
                                                        c.lastName = e.target.value
                                                        setUser(c)
                                                    }}
                                                    value={user.lastName}
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
                                                                const c = { ...user }
                                                                c.email = e.target.value
                                                                setUser(c)
                                                            }}
                                                            value={user.email}

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
                                                    selected={user.Phone}
                                                    className="form_control"
                                                    onChange={(e) => {
                                                        const c = { ...user }
                                                        c.phoneNumber = e.target.value
                                                        setUser(c)
                                                    }}
                                                    value={user.phoneNumber}
                                                />
                                                {emptyValidation.phoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>




                            {/*Company Information Start */}

                            <div className="col-12 column_margin">
                                <div className="card_custom">
                                    <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Company Information</h3>

                                    <div className="form-row">

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Company Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter Name"

                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.companyName = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.companyName}
                                                />
                                                {emptyValidation.companyNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Company name is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="email-container position-relative">
                                                <label htmlfor="uname" className="w-100 email-label">
                                                    Company Email
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
                                                                const c = { ...company }
                                                                c.companyEmail = e.target.value
                                                                setCompany(c)
                                                            }}
                                                            value={company.companyEmail}

                                                        />

                                                        <img className="tick-email" src="./img/Tick.svg" id="tick-1" alt="tickicon" />
                                                    </div>
                                                </div>
                                                {emptyValidation.companyEmailEmpty.length !== 0 ? (
                                                    <p style={{ marginTop: "5px", color: "red" }}>{emptyValidation.companyEmailEmpty} </p>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="phone-container position-relative">
                                                <label htmlfor="tel" className="number-label">
                                                    Company Phone Number
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter PhoneNumber"
                                                    maxLength="11"
                                                    onInput={maxLengthCheck}
                                                    selected={user.Phone}
                                                    className="form_control"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.companyPhoneNumber = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.companyPhoneNumber}

                                                />
                                                {emptyValidation.companyPhoneNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Phone number is required </p> : ""}
                                            </div>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Address</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="Enter Address"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.address = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.address}
                                                />
                                                {emptyValidation.addressEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Address is required </p> : ""}
                                            </div>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <div className="name">
                                                <label htmlfor="username"> Company website</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form_control"
                                                    placeholder="www.quick-tow.com/"
                                                    onChange={(e) => {
                                                        const c = { ...company }
                                                        c.website = e.target.value
                                                        setCompany(c)
                                                    }}
                                                    value={company.website}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Vahicle Cars End */}

                        {/* Attached Document Start */}

                        <div className="card_custom">
                            <h3 className="User_Profile_Name" style={{ paddingBottom: "50px" }}>Account information</h3>

                            <div className="form-row">

                                <div className="form-group col-md-4">
                                    <div className="name">
                                        <label htmlfor="username">Bank Name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form_control"
                                            placeholder="Bank of USA"
                                            onChange={(e) => {
                                                const c = { ...account }
                                                c.bankName = e.target.value
                                                setAccount(c)
                                            }}
                                            value={account.bankName}
                                        />
                                        {emptyValidation.bankNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Bank name is required </p> : ""}
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
                                            onChange={(e) => {
                                                const c = { ...account }
                                                c.accountName = e.target.value
                                                setAccount(c)
                                            }}
                                            value={account.accountName}

                                        />
                                        {emptyValidation.accountNameEmpty ? <p style={{ marginTop: "5px", color: "red" }}> Account name is required </p> : ""}
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
                                            onChange={(e) => {
                                                const c = { ...account }
                                                c.accountNumber = e.target.value
                                                setAccount(c)
                                            }}
                                            value={account.accountNumber}
                                        />
                                        {emptyValidation.accountNumberEmpty ? <p style={{ marginTop: "5px", color: "red" }}>Account Number </p> : ""}
                                    </div>
                                </div>

                            </div>

                        </div>


                        {/* Attached Documents End */}


                        <div className="form-group col-md-12 formbtncontainer__outercontainer--layout3">
                            <div className="formbtncontainer">
                                <button type="submit" disabled={btnLock} className="profile-business-accept btn btn-primary">
                                    Update {btnLock ? <div className="btnloader">{Loader}</div> : ""}
                                </button>
                                <Link to="/ManageCompany" className="btn_primary btn_email_primary view_user_cancel">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}
export default EditCompany
