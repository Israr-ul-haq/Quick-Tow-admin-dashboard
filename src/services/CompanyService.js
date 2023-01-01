import axios from "../shared/AxiosConfig"

export default class CompanyService {
  get = async () => {
    try {
      const response = await axios.get("api/Account/GetAllCompanies")
      return response
    } catch (error) {
      return error.response
    }
  }
  getById = async (userId) => {
    try {
      const response = await axios.get(`api/Account/GetById/${userId}`)
      return response
    } catch (error) {
      return error.response
    }
  }

  saveCompany = async (data) => {
    try {
      const response = await axios.post("api/Account/RegisterCompany", data)
      return response
    } catch (error) {
      return error.response
    }
  }
  updateCompany = async (data) => {
    try {
      const response = await axios.put("api/Account/UpdateCompany", data)
      return response
    } catch (error) {
      return error.response
    }
  }

  uploadImage = async (data, userId) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post(`api/Account/UploadProfile/${userId}`, data, config)
      return response
    } catch (error) {
      return error.response
    }
  }

  delete = async (CompanyId) => {
    try {
      const response = await axios.delete(
        `api/Account/DeleteCompany/${CompanyId}`,
      )
      return response
    } catch (error) {
      return error.response
    }
  }
}
