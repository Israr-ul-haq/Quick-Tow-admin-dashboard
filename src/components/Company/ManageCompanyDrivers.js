import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"


const CompanyTruckManagement = () => {
  // SERVICES
 

  //State
  const [data, setData] = useState([{
    Name: "Lahaina Grill",
    Email: "matthew@mail.com",
    PhoneNumber: "(382)694-8601",
    Status: "Active",
    StatusBlock: "Unblock"
  }])
  const [loader, setLoader] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const columnNames = [
    {
      UserId: 14,
      Name: "jan",
      Email: "jan@gmail.com",
      Phone: "35688",
      Password: "123",
      UserTypeId: 5,
      UserType: "User",
      DeviceId: "1122",
    },
  ]
  const columns = [
    {
      name: "No#",
      cell: (row, index) => index + 1,
      sortable: true,
<<<<<<< HEAD:src/components/Company/ManageCompanyDrivers.js
     
    },

   
=======
      grow: 0,
      width:"50px",
      maxWidth: "50px"
    },

    {
      name: "Photo",
      button: true,
      cell: (row) => (
        <img
          className="data_Table_img"
          src={row.ProfilePicture ? "https://maktabq-api.jinnbytedev.com/" + row.ProfilePicture : "/img/images.png"}
          alt="profile"
        />
      ),
      grow: 0,
      width: "150px",
      maxWidth: "150px"
    },
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/User/ManageUser/ManageUser.js
    {
      name: "Name",
      selector: "Name",
      sortable: true,
<<<<<<< HEAD:src/components/Company/ManageCompanyDrivers.js
      
=======
 
   
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/User/ManageUser/ManageUser.js
    },
    {
      name: "Email",
      selector: "Email",
      sortable: true,
<<<<<<< HEAD:src/components/Company/ManageCompanyDrivers.js
      
=======
      grow: 0,
      width: "350px",
      maxWidth: "350px"
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/User/ManageUser/ManageUser.js
    },
    {
      name: "Phone Number",
      selector: "PhoneNumber",
      sortable: true,
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
    },
    {
      name: "Status",
      selector: "StatusBlock",
      sortable: true,
<<<<<<< HEAD:src/components/Company/ManageCompanyDrivers.js
=======
    
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/User/ManageUser/ManageUser.js
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to="/ViewCompanyDriver" className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to="/EditCompanyDriver" className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
<<<<<<< HEAD:src/components/Company/ManageCompanyDrivers.js
            onClick={() => deleteItem(row.UserId, data,  "User", setLoader)}
=======
            onClick={() => deleteItem(row.UserId, data, userService, "User", setLoader, "User")}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/User/ManageUser/ManageUser.js
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
          <Link  className="TableEdit">
            <img alt="table-action" className="block_table_action" src="./img/Block.svg" />
          </Link>
        </div>
      ),
      grow: 0,
    },
  ]

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
    const headers = [["User Name", "Email", "Phone", "Password"]]
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
    doc.save("User.pdf")
  }

 

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
                <h1 className="headertopbar_title">Company Truckers Management</h1>
               < div className="primary-multiple-btns">
                  <Link to="/AddCompanyDriver" className="profile-business-accept btn btn-primary btnAddnew">Add</Link>
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
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames)}>
                    CSV
                  </button>
                </div>
                <input
                  className="tablesearchbox"
                  type="text"
                  placeholder="Search"
                  aria-label="Search Input"
                />
                <DataTable
                  title=""
                  columns={columns}
                  data={data}
             
                  pagination
              customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>

      </main>
     
    </div>
  )
}

export default CompanyTruckManagement
