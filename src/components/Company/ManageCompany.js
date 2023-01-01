import React from "react"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import deleteItem from "../../shared/DeleteItem"
import downloadCSV from "../../shared/CSV"

import "jspdf-autotable"
import jsPDF from "jspdf"
import CompanyService from "../../services/CompanyService"
import Loader from "../../shared/Loader"


const ManageCompany = () => {
  // SERVICES
 
const companyService = new CompanyService()
const [loader, setLoader] = useState(true)
const [dataCount, setDataCount] = useState(0)
  //State
  const [data, setData] = useState([{
    CompanyName: "Sawa jen",
    Email: "matthew@mail.com",
    PhoneNumber: "(382)694-8601",
    NumberofDrivers:"45"
  }])

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
      grow: 0,
     
    },

   
    {
<<<<<<< HEAD:src/components/Company/ManageCompany.js
      name: "Company Name",
      selector: "companyName",
      sortable: true,
      
=======
      name: "Feature Name",
      selector: "Name",
      sortable: true,
      grow: 0,
      width: "150px",
      minWidth: "150px",
      maxWidth: "150px",
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Features/Features.js
    },
    {
<<<<<<< HEAD:src/components/Company/ManageCompany.js
      name: "Email",
      selector: "companyEmail",
      sortable: true,
      
    },
    {
      name: "Phone Number",
      selector: "companyPhoneNumber",
      sortable: true,
    },
    {
      name: "Number of Drivers",
      selector: "noOfDrivers",
      sortable: true,
    },
   
=======
      name: "Active icons",
      button: true,
      cell: (row) => (
        <img
          style={{ width: "25px" }}
          src={row.ImagePath ? "https://maktabq-api.jinnbytedev.com/" + row.ImagePath : "/img/images.png"}
          alt="profile"
        />
      ),
      grow: 0,
    },
    {
      name: "In-active icons",
      button: true,
      cell: (row) => (
        <img style={{ width: "25px" }} src={row.GreyIcon ? "https://maktabq-api.jinnbytedev.com/" + row.GreyIcon : "/img/images.png"} alt="profile" />
      ),
      grow: 0,
    },
    {
      name: "Category Name",
      selector: "CategoryName",
      sortable: true,
      grow: 0,
      width: "150px",
      minWidth: "150px",
      maxWidth: "150px",
    },
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Features/Features.js

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="tableactions">
          <Link to={`/ViewCompanyProfile/${row.userId}`} className="TableEdit">
            <img src="./img/view.svg" alt="event" />
          </Link>
          <Link to={`/EditCompany/${row.userId}`} className="TableEdit">
            <img alt="table-action" className="tableactions_image" src="./img/Edit.svg" />
          </Link>
          <button
            type="button"
            data-toggle="modal"
            class="tableactions_action"
            onClick={() => deleteItem(row.companyId, data, companyService, "Company", setLoader)}
          >
            <img alt="table-action" class="tableactions_image" src="./img/Delete.svg" />
          </button>
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
    const response = await companyService.get()
    setData(response.data.data)
    setLoader(false)
  }

<<<<<<< HEAD:src/components/Company/ManageCompany.js
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
  const search = async (search) => {
    setLoader(true)
    const response = await featureService.get(search)
    setData(response.data.Data)
    setLoader(false)
  }
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Features/Features.js

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
<<<<<<< HEAD:src/components/Company/ManageCompany.js
                <h1 className="headertopbar_title"> Manage Companies</h1>
                  <Link to="/AddCompany" className="profile-business-accept btn btn-primary btnAddnew">Add Company</Link>
                  
                  </div>
              
=======
                <h1 className="headertopbar_title">Manage Feature List</h1>
                <Link to="/FeaturesAdd" className="headertopbar_btn btn_primary">
                  Add New Feature
                </Link>
              </div>
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e:src/components/Features/Features.js
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
    </div>
  )
}

export default ManageCompany
