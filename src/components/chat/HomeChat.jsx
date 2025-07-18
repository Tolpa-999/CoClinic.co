import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {   Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser }from '../../features/chat/chatSlice'
import Sidebar from './Sidebar'
import io from 'socket.io-client'

import {baseURL, UserUrls} from '../../utils/serverURL'
import axiosInstance from '../../utils/axiosInstance'

const HomeChat = () => {
  // const user = useSelector(state => state.chat)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    const fetchUserDetails = async()=>{ 
      try {
          const URL = UserUrls.getDetails
          // console.log(URL)
          const response = await axiosInstance({
            url : URL,
          })
          // console.log("response,   hhfkjdfh",response)
          dispatch(setUser(response?.data?.data))
          console.log("response from Home Page ====> ", response?.data)

          if(response?.data?.data?.logout){
              dispatch(logout())
              navigate("/signin")
          }
          // console.log("current user Details",response)
      } catch (error) {
          console.log("error",error)
      }
    }

    fetchUserDetails()
  },[dispatch, navigate])

  /***socket connection */
  useEffect(()=>{
    const socketConnection = io("https://co-clinic.up.railway.app",{
      auth : {
        token : localStorage.getItem('token')
      },
      transports: ['websocket'], // force only WebSocket
    })

    socketConnection.on('onlineUser',(data)=>{
      // console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[dispatch])

  const basePath = location.pathname === '/livechat'
  // console.log(basePath)

  
  
  return (
    <div className="min-h-screen bg-[#f0faf7]">
      <div className='grid w-2/3 lg:grid-cols-[300px,1fr]  mx-auto min-h-[90vh]'>
          <section className={`bg-white ${!basePath && "hidden"}  lg:block`}>
             <Sidebar/>
          </section>
          {/**message component**/}
        <section className={`${basePath && "hidden"}`} >
            <Outlet/>
        </section>
          {/* <div className={`flex  justify-center items-end flex-col gap-10  ${!basePath ? "hidden" : "lg:flex" } `}>
              <div className=''>
                <img
                  src="https://www.salesmate.io/blog/wp-content/uploads/2021/11/20-Best-Live-Chat-Software-Services-to-Use-in-2021.jpg"
                  className="rounded-full w-32 h-32 object-cover"
                  alt='logo'
                />
              </div>
              <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
          </div> */}
      </div>
    </div>
  )
}

export default HomeChat