import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"
<<<<<<< HEAD:src/components/Services/ManageServices.js
=======
import deleteItem from "../../shared/DeleteItem"
import moment from "moment"

>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js


const ManageServices = () => {
  // SERVICES
 

  //State
<<<<<<< HEAD:src/components/Services/ManageServices.js
  const [data, setData] = useState([{
    Services: "Tire Change",
    Price: "$ 72",
  }])
  const [loader, setLoader] = useState(false)
  const [dataCount, setDataCount] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
=======
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)
  
  const [dataCount, setDataCount] = useState(0)

  
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
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
<<<<<<< HEAD:src/components/Services/ManageServices.js
     
=======
      grow:0
    },

    {
      name: "User Name",
      selector: "Username",
      sortable: true,
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
    },

   
    {
      name: "Services",
      selector: "Services",
      sortable: true,
      
    },
    {
<<<<<<< HEAD:src/components/Services/ManageServices.js
      name: "Price",
      selector: "Price",
      sortable: true,
      
=======
      name: "Phone Number",
      selector: "Phone",
      sortable: true,
    },
    {
      name: "Address",
      selector: "Address",
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <p>
          {row.Status ? (
            row.Status === "Approved" ? (
              <span style={{ color: "green" }}>Accepted</span>
            ) : (
              <span style={{ color: "red" }}>Rejected</span>
            )
          ) : (
            "-"
          )}
        </p>
      ),
      sortable: true,
    
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
    },
    

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
<<<<<<< HEAD:src/components/Services/ManageServices.js
          <Link to="/ViewService" className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to="/EditService" className="TableEdit">
=======
          <Link to={`ViewSlots/${row.BusinessId}`} className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          {/* <Link to={`EditSubscription/${row.SubscriptionId}`} className="TableEdit">
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem()}
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button> */}
        </div>
      ),
      grow: 0,
    },
  ]

<<<<<<< HEAD:src/components/Services/ManageServices.js
  
  const customStyles = {
    
    headCells: {
        style: {
          fontFamily: "Poppins",
          fontWeight: 900,
          fontSize: "15px",
          color: "#2D2D2E"
        },
    },
};
 

 

=======
  //UseEffect
  useEffect(() => {
    if (dataCount === 0) {
      getBusinesses()
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getBusinesses = async () => {
    const response = await slotsService.getBusinesses("")
    setData(response.data.Data)
    
    setLoader(false)
  }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
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
<<<<<<< HEAD:src/components/Services/ManageServices.js

 

=======
    const search = async (search) => {
      setLoader(true)
      const response = await slotsService.getBusinesses(search)
      setData(response.data.Data)
      setLoader(false)
    }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
<<<<<<< HEAD:src/components/Services/ManageServices.js
                <h1 className="headertopbar_title">Services</h1>
                
                <Link to="/AddNewService" className="profile-business-accept btn btn-primary btnAddnew">Add Service</Link>
=======
                <h1 className="headertopbar_title"> Manage Slots</h1>
                <Link to="/AddNewSlot" className="headertopbar_btn btn_primary">
                  Create New Slots
                </Link>
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Slots/ManageSlots.js
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

export default ManageServices
