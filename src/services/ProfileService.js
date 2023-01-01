import axios from "../shared/AxiosConfig"

<<<<<<< HEAD
export default class profilService {
    getProfileUser = async (userId) => {
        try{
            const response = await axios.get(`api/Account/GetAdminById/${userId}`)
            return response
        } catch(error){
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
    updateProfile = async (data) => {
        try{
            const response = await axios.put(`api/Account/UpdateAdmin`,data)
            return response
        } catch(error){
            return error.response
        }
    }
}
=======
export default class ProfileService {
  getById = async (id) => {
    try {
      const response = await axios.get("/api/Admin/Profile/GetProfile?userId=" + id)
      return response
    } catch (error) {
      return error.response
    }
  }

  uploadImage = async (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    try {
      const response = await axios.post("/api/Admin/Voucher/UploadVoucherImage", data, config)
      return response
    } catch (error) {
      return error.response
    }
  }

  update = async (data) => {
    try {
      const response = await axios.post(`/api/Admin/Account/UpdateProfile`, data)
      return response
    } catch (error) {
      return error.response
    }
  }
}
>>>>>>> eee0ccdd2a409cadaca5930e069292f9036fe73e
