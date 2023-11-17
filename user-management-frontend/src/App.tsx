import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from './components/Card'
import PaginatedItems from './components/PaginatedItems'

export interface userInterface {
  id:number
  first_name: string
  last_name: string
  email: string
  available: boolean
  domain: string
  avatar: string

}
function App() {

  const [users, setUsers] = useState<userInterface[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20
  const [info, setInfo] = useState({
    page: 1,
    totalPages: 50,
    totalUsers: 1000
  })

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data }: { data: { users: userInterface[], page: number, totalPages: number, totalUsers: number } } = await axios.get(`${import.meta.env.VITE_URL}users?page=${currentPage}&limit=${usersPerPage} `)
        setUsers([...data.users])
        setInfo({
          ...info,
          page: data.page,
          totalPages: data.totalPages,
          totalUsers: data.totalUsers
        })
        console.log(data)
      } catch (err) {
        console.log(err)
      }

    }
    getAllUsers()
  }, [currentPage, usersPerPage])

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function createArray(N: number) {
    return Array.from({ length: N }, (_, index) => index + 1);
  }

  return (
    <>
      <h1 className='text-center text-xl sm:text-2xl py-2 shadow-md '>User Management App</h1>
      {/* <div className='flex flex-wrap gap-y-10 p-4 sm:p-10'>
        {users.map((user) => <Card user={user} />)}
      </div> */}
    
      {/* <div className='flex border border-red-500 py-4 justify-evenly'>
        {createArray(info.totalPages).map((item, index) => <div
          onClick={() => paginate(item)}
          className='bg-gray-200 px-1 py-1 text-xs cursor-pointer'>{item}</div>)}
      </div> */}
      <PaginatedItems />
    </>
  )
}

export default App
