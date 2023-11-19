import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import Pagination from '../components/Pagination'
import SideBar from '../components/SideBar'
import { IoIosClose } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import Header from '../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import { dataType, filtersInterface, userInterface } from '../types'
import Teams from '../components/Teams'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setValue } from '../features/user/userSlice'

function Home() {
    const dispatch = useAppDispatch()
    const userCount = useAppSelector((state) => state.user.value)
    const [name, setName] = useState('')
    const [searchResults, setSearchResults] = useState<dataType>({} as dataType)
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<filtersInterface>({
        domain: [],
        gender: '',
        available: ''
    })
    const [selectedUsers, setSelectedUsers] = useState<userInterface[]>([])
    const [team, setTeam] = useState({
        showDialog: false,
        title: ''
    })
    const [showFilters, setShowFilters] = useState(false)


    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1)
    };

    const createTeam = async () => {
        if (!team.title) {
            toast.error("Please enter a name")
            return;
        }
        try {
            const userId = selectedUsers.map((user) => user._id)
            await axios.post(`${import.meta.env.VITE_URL}team`, {
                title: team.title,
                userId: userId
            })
            setTeam({ ...team, showDialog: false })
            setSelectedUsers([])
            dispatch(setValue(0))
            toast.success(`Team ${team.title} created `)
        } catch (err: any) {
            console.log(err)
            toast.error(err?.response?.data?.msg || "Can't create team.")
        }
    }
    useEffect(() => {
        const getSearchResult = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_URL}users`,
                    {
                        params: {
                            search: name,
                            page: currentPage,
                            domain: filters.domain,
                            gender: filters.gender,
                            ...(filters.available && { available: filters.available }),
                        }
                    }
                )
                setSearchResults({ ...data })
                // console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        getSearchResult()

    }, [name, currentPage, filters.available, filters.domain, filters.gender])



    return (
        <>
            <Header />
            <ToastContainer />
            <div className='p-2 shadow-md flex items-center justify-between'>
                <Teams />

                <input
                    type="text"
                    placeholder="Search Name"
                    className="text-sm border border-gray-400 p-2 w-[90%] sm:w-[40%] max-w-[300px]  block rounded-md outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FaFilter
                    cursor="pointer"
                    className="ml-4 sm:hidden"
                    size={25}
                    onClick={() => setShowFilters(!showFilters)}
                />
            </div>


            <div className={`flex ${showFilters ? "flex-col" : "flex-row"} sm:flex-row`}>
                <SideBar
                    filters={filters}
                    setFilters={setFilters}
                    setShowFilters={setShowFilters}
                    showFilters={showFilters}
                />
                <div className=''>
                    <div className='flex flex-wrap gap-y-10 p-4 sm:p-10'>
                        {searchResults?.users?.map((user) => <Card
                            user={user}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                            key={user._id}
                        />)}
                    </div>
                    {searchResults.totalPages === 1 ? <></> :
                        <Pagination
                            handlePageClick={handlePageClick}
                            pageCount={searchResults?.totalPages}
                        />
                    }
                </div>
            </div>

            <>
                {
                    selectedUsers.length > 0 &&
                    <div className='fixed bottom-0 left-0 right-0 h-[100px] bg-[#2b272786] flex flex-col items-center justify-center'>
                        <p className='text-center font-bold  bg-yellow-300 inline-block mx-auto px-3'>{userCount} users selected</p>
                        <button
                            onClick={() => setTeam({ ...team, showDialog: true })}
                            type='button'
                            className='text-white bg-blue-500 mx-auto block px-4 py-1 rounded-md mt-2 '>
                            Create Team
                        </button>
                    </div>
                }

            </>
            {
                team.showDialog &&
                <div className='fixed  top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#2926264f]' >
                    <div className='p-4 left-1/2 top-1/2  w-[90%] sm:w-[400px] min-h-[200px] bg-white shadow-2xl rounded-xl'>
                        <IoIosClose
                            className="ml-auto block mt-2 mr-2"
                            cursor="pointer"
                            size={30}
                            onClick={() => setTeam({ ...team, showDialog: false })}
                        />

                        <div className='w-full'>
                            <label>Title of Team</label>
                            <input
                                type='text'
                                className='border border-gray-400 p-2  mx-auto block rounded-md outline-none w-full mt-2'
                                value={team.title}
                                onChange={(e) => setTeam({ ...team, title: e.target.value })}
                                placeholder='team1'
                            />
                            {
                                selectedUsers.map(user => <div key={user._id} className='mt-4 flex items-center'>
                                    <div className='rounded-full w-8 h-8 overflow-hidden mr-4'>
                                        <img src={user.avatar} className='bg-gray-200 w-full' alt="" />
                                    </div>
                                    <div className=''>
                                        <p className='font-semibold'>{user.first_name} {user.last_name}</p>
                                        <p className='text-xs text-gray-400 mt-1'>Domain: {user.domain}</p>
                                    </div>
                                </div>)
                            }

                            <button
                                onClick={createTeam}
                                type='button'
                                className='mt-6 text-white bg-blue-700 mx-auto block px-4 py-1 rounded-md  '>
                                Create Team
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Home
