import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"
import DriversService from "../../services/DriversService"
import Loader from "../../shared/Loader"

const TruckManagement = () => {
  // SERVICES

  const drvierService = new DriversService()
  const [loader, setLoader] = useState(true)
  const [dataCount, setDataCount] = useState(0)

  //State
  const [data, setData] = useState([
    {
      Name: "",
      Email: "",
      PhoneNumber: "",
      Status: "",
      StatusBlock: "",
    },
  ])

  const columnNames = [
    {
      companyName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      userStatusesTitle: "",
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
      name: "First Name",
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
      name: "Company",
      selector: "companyName",
      sortable: true,
    },
    {
      name: "Activity",
      cell: (row) => (
        <p>
          {row.userStatusesTitle === "Active" ? (
            <span style={{ color: "green" }}>Active</span>
          ) : row.userStatusesTitle === "Blocked" ? (
            <span style={{ color: "red" }}>Blocked</span>
          ) : (
            ""
          )}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: "StatusBlock",
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to="/ViewTrucker" className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to={`/EditTruck/${row.id}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row.id, data, drvierService, "Trucker", setLoader)}
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
          <Link to="/EditUser" className="TableEdit">
            <img alt="table-action" className="block_table_action" src="./img/Block.svg" />
          </Link>
        </div>
      ),
      grow: 0,
    },
  ]

  useEffect(() => {
    if (dataCount === 0) {
      getCompanies(0)
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  const getCompanies = async () => {
    setLoader(true)
    debugger
    const response = await drvierService.getDrivers()
    setData(response.data.data)
    setLoader(false)
  }

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "Truckers"
    const headers = [["Company", "First Name", "Last Name", "Email", "Phone Number", "Activity"]]
    const pdfData = data.map((elt) => {
      return [elt.companyName, elt.firstName, elt.lastName, elt.email, elt.phoneNumber, elt.userStatusesTitle]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("Truckers.pdf")
  }

  const customStyles = {
    headCells: {
      style: {
        fontFamily: "Poppins",
        fontWeight: "bolder",
        fontSize: "15px",
        color: "#2D2D2E",
      },
    },
  }

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title"> Truckers Management</h1>
                <div className="primary-multiple-btns">
                  {/* <button type="button" className="headertopbar_btn btn_primary" data-toggle="modal" data-target="#email-popup">
                  Invite
                  </button> */}
                  <Link to="/AddNewTruck" className="profile-business-accept btn btn-primary btnAddnew">
                    Add
                  </Link>
                </div>
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
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames, "Truckers")}>
                    CSV
                  </button>
                </div>
                <input className="tablesearchbox" type="text" placeholder="Search" aria-label="Search Input" />
                {loader ? Loader : <DataTable title="" columns={columns} data={data} pagination customStyles={customStyles} />}
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
                <input type="text" className="email-invite_input" />
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

export default TruckManagement
