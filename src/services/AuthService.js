import axios from "../shared/AxiosConfig"

export default class AuthService {
  login = async (data) => {
    try {
      const response = await axios.post("api/Account/LoginAdmin", data)
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

}
