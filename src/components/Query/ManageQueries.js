import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
<<<<<<< HEAD

import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"


const ManageQueries = () => {
  // SERVICES
 

  //State
  const [data, setData] = useState([{
    UserName: "Lahaina Grill",
    Email: "matthew@mail.com",
    Status: "Pending"
  }])
  const [loader, setLoader] = useState(false)
  const [dataCount, setDataCount] = useState(0)
=======
import moment from "moment"

import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"
import Loader from "../../shared/Loader"
import "jspdf-autotable"
import jsPDF from "jspdf"
import QueryService from "../../services/QueryService"

const ManageQueries = () => {
  // SERVICES
  const queryService = new QueryService()

  //State
  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loader, setLoader] = useState(true)
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const columnNames = [
    {
<<<<<<< HEAD
      UserId: 14,
      Name: "jan",
      Email: "jan@gmail.com",
      Phone: "35688",
      Password: "123",
      UserTypeId: 5,
      UserType: "User",
      DeviceId: "1122",
=======
      EventId: "01",
      Name: "Event 01",
      Address: "32 Blue Avenue, Melbourne London",
      Date: "28-02-2021",
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
    },
  ]
  const columns = [
    {
      name: "No#",
      cell: (row, index) => index + 1,
      sortable: true,
<<<<<<< HEAD
     
    },

   
=======
      grow: 0,
    },

    {
      name: "Photo",
      button: true,
      cell: (row) => (
        <img style={{ width: "25px" }} src={row.UserImage ? "https://maktabq-api.jinnbytedev.com/" + row.UserImage : "/img/images.png"} alt="profile" />
      ),
    },
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
    {
      name: "User Name",
      selector: "UserName",
      sortable: true,
<<<<<<< HEAD
      
    },
    {
      name: "Email",
      selector: "Email",
      sortable: true,
      
    },

    {
      name: "Status",
      selector: "Status",
      sortable: true,
    },
=======
      grow: 0,
      width: "150px",
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Description",
      selector: "Description",
      sortable: true,
      grow: 0,
      width: "200px",
      minWidth: "200px",
      maxWidth: "200px",
    },
  
    {
      name: "Status",
      cell: (row) => (
        <p>
          {row.Status === "Pending" ? (<span style={{ color: "red" }}>Pending</span>
          )
           : row.Status === "Resolved" ? (
            <span style={{ color: "green" }}>Resolved</span>
          ) : ('-')}
        </p>
      ),
      sortable: true,
      grow: 0,
      width: "150px",
      minWidth: "150px",
      maxWidth: "150px",
    },
   


   
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
<<<<<<< HEAD
          <Link to="/QueryReply" className="TableEdit">
            <img src="./img/Reply.svg" alt="event" />
=======
          <Link to={`QueryReply/${row.QueryId}`} className="TableEdit">
            <img src="./img/Reply (1).svg" alt="event" />
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
<<<<<<< HEAD
            onClick={() => deleteItem()}
=======
            onClick={() => deleteItem(row.QueryId, data, queryService, "Query", setLoader)}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
        </div>
      ),
<<<<<<< HEAD
      grow: 0,
=======
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
    },
  ]

  //UseEffect

<<<<<<< HEAD

  //Functions
 

 
=======
  useEffect(() => {
    if (dataCount === 0) {
      getQueries(0)
      setDataCount(1)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  //Functions
  const getQueries = async (index) => {
    setLoader(true)
    const response = await queryService.get("", index)
    setData(response.data.Data.Queries)
    setTotalRows(response.data.Data.Total)
    setLoader(false)
  }

  const handlePageChange = (page) => {
    getQueries(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoader(true)
    const response = await queryService.get("", page)
    setData(response.data.Data.Queries)
    setPerPage(newPerPage)
    setLoader(false)
  }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

<<<<<<< HEAD
    const title = "Users"
    const headers = [["User Name", "Email", "Phone", "Password"]]
    const pdfData = data.map((elt) => {
      return [elt.Name, elt.Email, elt.Phone, elt.Password]
=======
    const title = "Queries"
    const headers = [["Event Name", "Description", "Address", "Date"]]
    const pdfData = data.map((elt) => {
      return [elt.Name, elt.Description, elt.Address, elt.Date]
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
    })

    let content = {
      startY: 50,
      head: headers,
      body: pdfData,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
<<<<<<< HEAD
    doc.save("User.pdf")
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

 
=======
    doc.save("Queries.pdf")
  }

  const search = async (search) => {
    setLoader(true)
    const response = await queryService.get(search, 0)

    setData(response.data.Data.Queries)
    setTotalRows(response.data.Data.Total)
    setLoader(false)
  }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e

  return (
    <div>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="headertopbar">
<<<<<<< HEAD
                <h1 className="headertopbar_title">Queries</h1>
=======
                <h1 className="headertopbar_title">Queries</h1> 
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
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
<<<<<<< HEAD
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames)}>
=======
                  <button className="btn btn-secondary datatablebuttons" onClick={(e) => downloadCSV(data, columnNames, "Queries")}>
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
                    CSV
                  </button>
                </div>
                <input
                  className="tablesearchbox"
                  type="text"
                  placeholder="Search"
                  aria-label="Search Input"
<<<<<<< HEAD
=======
                  onChange={(e) => search(e.target.value)}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
                />
                <DataTable
                  title=""
                  columns={columns}
                  data={data}
<<<<<<< HEAD
                 customStyles={customStyles}
                  pagination
                  
=======
                  progressPending={loader}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  pagination
                  paginationServer
                  paginationTotalRows={totalRows}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
                />
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD

        
      </main>
     
=======
      </main>
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
    </div>
  )
}

export default ManageQueries
