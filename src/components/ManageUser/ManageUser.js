import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"
import UsersService from "../../services/UsersService"
import Loader from "../../shared/Loader"



const UserManagement = () => {
  // SERVICES

  const usersService = new UsersService()
  //State
  const [loader, setLoader] = useState(true)
  const [dataCount, setDataCount] = useState(0)
  const [data, setData] = useState([{

  }])

  const columnNames = [
    {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: ""
    },
  ]
  const columns = [
    {
      name: "No#",
      cell: (row, index) => index + 1,
      sortable: true,
      grow: 0,
    },


    {
      name: "Full Name",
      selector: "firstName",
      sortable: true,

    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,

    },
    {
      name: "Email",
      selector: "email",
      sortable: true,

    },
    {
      name: "Phone Number",
      selector: "phoneNumber",
      sortable: true,

    },
    {
      name: "Status",

      cell: (row) => (
        <p>
          {row.userStatusesTitle === "Active" ? (<span style={{ color: "black" }}>Unblock</span>
          ) : row.userStatusesTitle === "Blocked" ? (
            <span style={{ color: "red" }}>Blocked</span>
          ) : ("")}
        </p>
      ),
    },




    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`/ViewUser/${row.id}/${row.userStatusesTitle}`}  className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to={`/EditUser/${row.id}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row.id, data, usersService, "User", setLoader)}
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
          {row.userStatusesTitle === "Active" ? <img alt="table-action" className="block_table_action" src="./img/Block.svg" id="block_btn" /> : <img alt="table-action" className="block_table_action" src="./img/Block.svg" style={{ opacity: "0.5" }} />}
        </div>
      ),
      grow: 0,
    },
  ]

  useEffect(() => {
    if (dataCount === 0) {
      getUsers(0)
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const getUsers = async () => {
    setLoader(true)
    const response = await usersService.get()
    setData(response.data.data)
    setLoader(false)
  }
  const customStyles = {

    headCells: {
      style: {
        fontFamily: "Poppins",
        fontWeight: "bolder",
        fontSize: "15px",
        color: "#2D2D2E"
      },
    },
  };



  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Users"
    const headers = [["First Name", "Last Name", "Email", "Phone Number"]]
    const pdfData = data.map((elt) => {
      return [elt.firstName, elt.lastName, elt.email, elt.phoneNumber]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("User.pdf")
  }



  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title"> User Management</h1>

                {/* <button type="button" className="headertopbar_btn btn_primary" data-toggle="modal" data-target="#email-popup">
                  Invite
                  </button> */}
              </div>
            </div>
            <div className="col-12 column_margin">
              <div className="card_custom">
                {" "}
                <div className="datatableheading">Export to:</div>
                <div>
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => exportPDF()}>
                    PDF
                  </button>
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames, "Users")}>
                    CSV
                  </button>
                </div>
                <input
                  className="tablesearchbox"
                  type="text"
                  placeholder="Search"
                  aria-label="Search Input"
                />
                {loader ? (
                  Loader
                ) : (
                  <DataTable
                    title=""
                    columns={columns}
                    data={data}
                    pagination
                    customStyles={customStyles}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        className="modal fade edit-auction-padding"
        id="email-popup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered emailPopup" role="document">
          <div>
            <div class="new-card">
              <div className="card-contain">
                <h4 className="card-header">Do you want to send an invite?</h4>
                <input type="text" className="email-invite_input" placeholder="Enter email" />
                <p className="link-para">Attached link: xample.edu/?action=aun=base</p>
                <div className="btn-contain">
                  <button type="button" className="btn_primary btn_email_primary" data-dismiss="modal">
                    Cancel
                  </button>
                  <button type="button" className="profile-business-accept btn btn-primary btn-popup">
                    Send
                  </button>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
