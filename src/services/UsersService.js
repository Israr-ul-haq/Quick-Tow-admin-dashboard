import axios from "../shared/AxiosConfig"

export default class UsersService {
  get = async () => {
    try {
      const response = await axios.get("api/User/GetAllUsers/")
      return response
    } catch (error) {
      return error.response
    }
  }
  getPlaces = async () => {
    try {
      const response = await axios.get(`/api/admin/NearByPlaces/get`)
      return response
    } catch (error) {
      return error.response
    }
  }

  getById = async (id) => {
    try {
      const response = await axios.get(`api/User/GetById/${id}`)
      return response
    } catch (error) {
      return error.response
    }
  }


  delete = async (id) => {
    try {
      const response = await axios.delete(`api/User/DeleteUser/${id}`, { id })
      return response
    } catch (error) {
      return error.response
    }
  }

  update = async (data) => {
    try {
      const response = await axios.put(`api/User/UpdateUser`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
  updateStatus = async (id , userStatus) => {
    try {
      const response = await axios.get(`api/User/ChangeUserStatus/${id}/${userStatus}`)
      return response
    } catch (error) {
      return error.response
    }
  }
  multipleImages = async (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post("/api/Admin/User/UploadBusinessImages", data, config)
      return response
    } catch (error) {
      return error.response
    }
  }
  getmultipleImages = async (id) => {
    try {
      const response = await axios.get(`/api/Admin/User/GetBusinessImages?businessId=${id}`)
      return response
    } catch (error) {
      return error.response
    }
  }
}
