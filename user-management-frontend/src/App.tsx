import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Card from './components/Card'
import Pagination from './components/Pagination'
import SideBar from './components/SideBar'

export interface userInterface {
  id: number
  first_name: string
  last_name: string
  email: string
  available: boolean
  domain: string
  avatar: string
  gender:string

}
type dataType = {
  users: userInterface[],
  page: number,
  totalPages: number,
  totalUsers: number
}

function App() {
  const [name, setName] = useState('')
  const [searcgResults, setSearchResults] = useState<dataType>({} as dataType)
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    domain: '',
    gender: '',
    available: ''
  })

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  };

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_URL}users?search=${name}&page=${currentPage}&domain=${filters.domain}&gender=${filters.gender}&available=${filters.available}`)
        setSearchResults({ ...data })
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }

    getSearchResult()

  }, [name, currentPage, filters.available, filters.domain, filters.gender])

  return (
    <>
      <h1 className="text-center sm:text-xl py-2 border-b-2 border-gray-400">User Management App</h1>


      <div className='p-1 shadow-md'>
        <input
          type="text"
          placeholder="Search Name"
          className="border border-gray-400 p-2 w-[90%] sm:w-[40%] mx-auto block rounded-md outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>


      <div className='flex '>
        <SideBar filters={filters} setFilters={setFilters} />
        <div className=''>
          <div className='flex flex-wrap gap-y-10 p-4 sm:p-10'>
            {searcgResults?.users?.map((user) => <Card user={user} />)}
          </div>
          {searcgResults.totalPages === 1 ? <></> :
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={searcgResults.totalPages}
            />
          }
        </div>
      </div>

      <>

      </>
    </>
  )
}

export default App
