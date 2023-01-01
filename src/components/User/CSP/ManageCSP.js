import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import UsersService from "../../../services/UsersService"
import deleteItem from "../../../shared/DeleteItem"
import downloadCSV from "../../../shared/CSV"
import "jspdf-autotable"
import jsPDF from "jspdf"
import { UserTypes } from "../../../constants/UserTypes"

const ManageCSP = () => {
  // SERVICES
  const cspService = new UsersService()

  //State
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  const [dataCount, setDataCount] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const columnNames = [
    {
      Name: "Admin",
      Email: "admin@gmail.com",
      Phone: "0307",
      Password: "123456",
      UserTypeId: 3,
      UserType: "Sub Admin",
      DeviceId: "Nill",
    },
  ]
  const columns = [
    {
      name: "No#",
      cell: (row, index) => index + 1,
      sortable: true,
      grow: 0,
      width:"50px",
      maxWidth: "50px"
    },

    {
      name: "Photo",
      button: true,
      cell: (row) => (
        <img className="data_Table_img" src={row.ProfilePicture ? "https://maktabq-api.jinnbytedev.com/" + row.ProfilePicture : "/img/images.png"} alt="profile" />
      ),
      grow: 0,
      width: "150px",
      maxWidth: "150px"
    
    },
    {
      name: "Name",
      selector: "Name",
      sortable: true,
   
    },
    {
      name: "Email",
      selector: "Email",
      sortable: true,
      grow: 0,
      width: "350px",
      maxWidth: "350px"
    },
    {
      name: "Phone Number",
      selector: "Phone",
      sortable: true,
     
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`ViewCSP/${row.UserId}`} className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to={`EditCSP/${row.UserId}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row.UserId, data, cspService, "CSP", setLoader, "User")}
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
        </div>
      ),
      grow: 0,
    },
  ]

  //UseEffect

  useEffect(() => {
    if (dataCount === 0) {
      getCSP(0)
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getCSP = async (index) => {
    setLoader(true)
    const response = await cspService.get("", index, UserTypes.CSP)
    const finalAdmins = []

    response.data.Data.Users.forEach((element) => {
      if (element.UserTypeId === UserTypes.CSP) {
        finalAdmins.push(element)
      }
    })
    setData(finalAdmins)
    setTotalRows(response.data.Data.Total)
    setLoader(false)
  }

  const handlePageChange = (page) => {
    getCSP(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoader(true)
    const response = await cspService.get("", page, UserTypes.CSP)
    const finalAdmins = []

    response.data.Data.Users.forEach((element) => {
      if (element.UserTypeId === UserTypes.CSP) {
        finalAdmins.push(element)
      }
    })
    setData(finalAdmins)
    setPerPage(newPerPage)
    setLoader(false)
  }

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "CSP"
    const headers = [["CSP Name", "Email", "Phone", "Password"]]
    const pdfData = data.map((elt) => {
      return [elt.Name, elt.Email, elt.Phone, elt.Password]
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("CSP.pdf")
  }
  const search = async (search) => {
    debugger
    setLoader(true)
    const response = await cspService.get(search, 0, UserTypes.CSP)
    const finalAdmins = []

    response.data.Data.Users.forEach((element) => {
      if (element.UserTypeId === UserTypes.CSP) finalAdmins.push(element)
    })
    setData(finalAdmins)
    setTotalRows(response.data.Data.Total)
    setLoader(false)
  }

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title">Manage Customer Service Personal</h1>
                <Link to="/AddNewCSP" className="headertopbar_btn btn_primary">
                  Add New CSP
                </Link>
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
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames, "CSP")}>
                    CSV
                  </button>
                </div>
                <input
                  className="tablesearchbox"
                  type="text"
                  placeholder="Search"
                  aria-label="Search Input"
                  onChange={(e) => search(e.target.value)}
                />
                <DataTable
                  title=""
                  columns={columns}
                  data={data}
                  progressPending={loader}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ManageCSP
