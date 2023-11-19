import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../components/Header';
import { userInterface } from '../types';

const UserDetails = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState<userInterface>({} as userInterface)

    useEffect(() => {
        const getUserDetails = async (userId: string | number) => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}users/${userId}`)
                console.log(data)
                setUserData({ ...data })
            } catch (err) {
                console.log(err)
            }
        }
        if (userId)
            getUserDetails(userId)
    }, [userId])
    return (
        <>
            <Header />
            <div className='bg-blue-50 p-5 rounded-md mx-auto max-w-[450px] mt-6'>
                <img src={userData?.avatar} alt={userData.first_name} className='w-[200px] h-[200px] object-contain border border-black bg-gray-50 ml-auto' />
                <p >
                    <span className='inline-block mr-5 w-[100px] sm:w-[200px] mt-5'>Id:</span>
                    <span>{userData?.id}</span>
                </p>
                <p >
                    <span className='inline-block mr-5 w-[100px] sm:w-[200px] mt-5'>Name:</span>
                    <span>{userData?.first_name} {userData?.last_name}</span>
                </p>
                <p >
                    <span className=' mt-5 inline-block mr-5 w-[100px] sm:w-[200px]'>Email:</span>
                    <span>{userData?.email}</span>
                </p>

                <p >
                    <span className=' mt-5 inline-block mr-5 w-[100px] sm:w-[200px]'>Domain:</span>
                    <span>{userData?.domain}</span>
                </p>
                <p >
                    <span className=' mt-5 inline-block mr-5 w-[100px] sm:w-[200px]'>Gender:</span>
                    <span>{userData?.gender}</span>
                </p>

                <p >
                    <span className=' mt-5 inline-block mr-5 w-[200px]'>Available:</span>
                    <span>{userData?.available ? "True" : "False"}</span>
                </p>


            </div>

        </>
    )
}

export default UserDetails
