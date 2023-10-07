import axios from "axios"

const getProfile = async (addressOrEns) =>
  axios.get("/api/get/profile", {
    params: {
      addressOrEns,
    },
  })

export default getProfile
