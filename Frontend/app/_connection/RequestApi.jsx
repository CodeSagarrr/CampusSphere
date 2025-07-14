import axios from "axios";
import toast from "react-hot-toast";

export const registerRequest = async(req , payload) => {
    try {
        const res = await axios.post(req , payload)
        return res;
    } catch (err) {
        toast.error( err.response?.data?.message || "Registration failed");
    }
}

export const loginRequest = async(req , payload) => {
    try {
        const res = await axios.post(req , payload)
        return res;
    } catch (err) {
        toast.error( err.response?.data?.message || "Login failed");
    }
}

export const logoutRequest = async(req) => {
    try {
        const res = await axios.get(req , {withCredentials : true})
        return res;
    } catch (err) {
        toast.error( err.response?.data?.message || "Login failed");
    }
}


export const checkUserLoginStatus = async(req) => {
    try {
        const res = await axios.get(req , { withCredentials : true })
        return res;
    } catch (err) {
        console.error( err || "Login failed");
    }
}