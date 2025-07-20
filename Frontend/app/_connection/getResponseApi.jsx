import axios from "axios";

export const getAllStudentUser = async(req) => {
    try {
        const res = await axios.get(req , {withCredentials : true});
        if(res.status === 200){
            return res.data
        }else{
            console.log("error in request" , res)
        }
    } catch (error) {
        console.log("Internal server error" , error.message)
    }
}

export const sendNoticeData = async(req , payLoad = {}) => {
    try {
        const res = await axios.post(req , payLoad );
        return res;
    } catch (error) {
        console.log("Internal server error" , error.message)
    }
}

export const sendEvents = async(req , payLoad) => {
    try {
        const res = await axios.post(req , payLoad , {withCredentials : true});
        return res
        
    } catch (error) {
        console.log("Internal server error" , error.message)
    }
}

export const sendResourceData = async(req , payLoad) => {
    try {
        const res = await axios.post(req , payLoad , {withCredentials : true})
       return res;
    } catch (error) {
        console.error("Error from sending request" , error.message)
    }
}

export const studentRegisterEvent = async(req ,) => {
    try {
        const res = await axios.patch(req , {withCredentials : true})
       return res;
    } catch (error) {
        console.error("Error from sending request" , error.message)
    }
}
export const sentFacultyResponse = async(req , payLoad) => {
    try {
        const res = await axios.patch(req , payLoad ,  {withCredentials : true})
       return res;
    } catch (error) {
        console.error("Error from sending request" , error.message)
    }
}

export const sentStudentQuery = async(req , payLoad) => {
    try {
        const res = await axios.post(req , payLoad ,  {withCredentials : true})
       return res;
    } catch (error) {
        console.error("Error from sending request" , error.message)
    }
}