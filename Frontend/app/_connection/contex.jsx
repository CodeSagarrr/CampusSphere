"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const[allStudent , setAllStudent] = useState(0);
  const [notices, setNotices] = useState([]);
  const [getResources, setGetresources] = useState([]);
  const [getEvents, setGetEvents] = useState([]);
  const [getStudentQueries, setGetStudentQueries] = useState([]);

  useEffect(() => {
    const getStudent = async() => {
      try {
          const response = await axios.get("/v1/allstudents");
          setAllStudent(response.data?.studentUser?.length);
      } catch (error) {
        console.log("error occured" , error.message)
      }
    }
    getStudent();
    const interval = setInterval(() => {
      getStudent()
    }, 2000)
    return () => clearInterval(interval);
  } , [])

  useEffect(() => {
    const getLoginUser = async () => {
      try {
        const res = await axios.get("/v1/check-auth", { withCredentials: true });
        if (res.status === 200) {
          setUser(res.data?.user)
        } else {
          setUser({})
          console.log(res)
        }
      } catch (error) {
        console.log("Error occured in context ", error.message)
      }

    }
    getLoginUser();
  }, [])

  useEffect(() => {
    const getAllNotice = async () => {
      try {
        const res = await axios.get("/v1/getnotice", { withCredentials: true });
        if (res.status === 200) {
          setNotices(res.data);
        } else {
          setNotices([]);
          console.log("Wrong res :", res);
        }
      } catch (error) {
        console.log("Error from getting response from server", error.message)
      }
    }
    getAllNotice();
    const interval = setInterval(() => {
      getAllNotice()
    }, 2000)
    return () => clearInterval(interval);

  }, [])

  useEffect(() => {
    const getAllResources = async () => {
      try {
        const res = await axios.get("/v1/getstudyresource", { withCredentials: true });
        if (res.status === 200) {
          setGetresources(res.data);

        } else {
          setGetresources([]);
          console.log("Wrong res :", res);
        }
      } catch (error) {
        console.log("Error from getting response from server", error.message)
      }
    }
    getAllResources();
    const interval2 = setInterval(() => {
      getAllResources();
    }, 2000)
    return () => clearInterval(interval2);
  }, [])


  // get Events
  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const res = await axios.get("/v1/getallevents", { withCredentials: true });
        if (res.status === 200) {
          setGetEvents(res.data);
        } else {
          setGetEvents([]);
          console.error("Wrong res :", res);
        }
      } catch (error) {
        console.error("Error from getting response from server", error.message)
      }
    }
    getAllEvents();
    const interval3 = setInterval(() => {
      getAllEvents();
    }, 2000)
    return () => clearInterval(interval3);
  }, [])

  useEffect(() => {
    const getAllStudentQueries = async () => {
      try {
        const res = await axios.get("/v1/getstudentqueries", { withCredentials: true });
        if (res.status === 200) {
          setGetStudentQueries(res.data?.queries);
        } else {
          setGetEvents([]);
          console.error("Wrong res :", res);
        }
      } catch (error) {
        console.log("Error from getting response from server", error.message)
      }
    }
    getAllStudentQueries();
    const interval3 = setInterval(() => {
      getAllStudentQueries();
    }, 2000)
    return () => clearInterval(interval3);
  }, [])
  return (
    <AppContext.Provider
      value={{
        allStudent,
        user,
        setUser,
        notices,
        setNotices,
        getResources,
        getEvents,
        getStudentQueries
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);