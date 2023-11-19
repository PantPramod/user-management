import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { teamTypes, userInterface } from '../types';

const Teams = () => {
    const [teams, setTeams] = useState<teamTypes[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const getAllTeams = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}team`)
                setTeams([...data])
                console.log(data)
            } catch (err) {

            }
        }
        getAllTeams()
    }, [])
    return (
        <>
            <Header />
            <div className='p-2 shadow-md flex items-center justify-between'>
                <Link to="/" className='hover:text-blue-600 flex items-center'>
                    <IoIosArrowRoundBack size={25} />
                    Home
                </Link>
                <h2 className='mx-auto font-semibold text-xl'> Teams</h2>
            </div>

            {teams.length === 0
                &&
                <p className="py-16 border-dashed border bg-gray-200 text-center rounded-xl mt-10 border-green-500 text-green-600 max-w-[500px] mx-auto text-xl font-semibold">
                    No teams found
                </p>
            }

            {teams.map((team: any) => <div className='flex flex-col gap-y-5 sm:flex-row justify-around py-5 px-5 border-b border-b-gray-300 mb-10' key={team._id}>
                <p className='font-semibold '>{team.title}</p>

                <div className=''>
                    {team?.userId.map((user: userInterface) => <div
                        onClick={() => navigate(`/${user?.id}`)}
                        className='py-2 hover:bg-gray-200 px-2 cursor-pointer'
                        key={user._id}>

                        <div className='flex items-center gap-x-4'>
                            <img src={user.avatar} alt={user.first_name} width={50} height={50} className='bg-gray-300 rounded-full ' />
                            <p>
                                <span className='block'>{user.first_name} {user.last_name}</span>
                                <span className='block text-xs text-gray-400'>Domain : {user.domain}</span>
                            </p>
                        </div>
                    </div>)}

                </div>

            </div>)}


        </>
    )
}

export default Teams
