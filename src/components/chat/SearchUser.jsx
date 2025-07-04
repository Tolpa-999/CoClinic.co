/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import axios from 'axios';
import { IoClose } from "react-icons/io5";
import {UserUrls} from '../../utils/serverURL'
import axiosInstance from '../../utils/axiosInstance';
import { useTranslation } from 'react-i18next';

/////// translate is required here




const SearchUser = ({onClose}) => {
    const {t} = useTranslation()
    const [searchUser,setSearchUser] = useState([])
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState("")


    useEffect(()=>{
        const handleSearchUser = async()=>{
            const URL = UserUrls.searchOne
            try {
                setLoading(true)
                const response = await axiosInstance.post(URL,{
                    search : search
                })
                setLoading(false)

                setSearchUser(response.data.data)
                // console.log("search user",response.data.data)

            } catch (error) {
                console.log(error)
            }
        }

        handleSearchUser()
    },[search])

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
        <div className='w-full max-w-lg mx-auto mt-10'>
            {/**input search user */}
            <div className='bg-white rounded h-14 overflow-hidden flex '>
                <input 
                    type='text'
                    placeholder={t('live_chat.search')}
                    className='w-full outline-none py-1 h-full px-4'
                    onChange={(e)=>setSearch(e.target.value)}
                    value={search}
                />
                <div className='h-14 w-14 flex justify-center items-center'>
                    <IoSearchOutline size={25}/>
                </div>
            </div>

            {/**display search user */}
            <div className='bg-white mt-2 w-full p-4 rounded'>
                {/**no user found */}
                {
                    searchUser.length === 0 && !loading && (
                        <div className='text-center text-slate-500'>{t('live_chat.no_user')}
                        </div>
                    )
                } 

                {
                    loading && (
                        <div><Loading/></div>
                    )
                }

                {
                    searchUser.length !==0 && !loading && (
                        searchUser.map((user,/*index */)=>{
                            return(
                                <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                            )
                        })
                    )
                } 


            </div>
        </div>

        <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
            <button>
                <IoClose/>
            </button>
        </div>
    </div>
  )
}

export default SearchUser
