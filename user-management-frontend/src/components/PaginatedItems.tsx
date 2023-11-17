import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Card from './Card';
import { userInterface } from '../App';
import axios from 'axios'

type dataType = { users: userInterface[], page: number, totalPages: number, totalUsers: number }

function PaginatedItems() {

    const [users, setUsers] = useState<number[]>([])

    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 20

    const [info, setInfo] = useState<dataType>({
        page: 1,
        totalPages: 50,
        totalUsers: 1000,
        users: []
    })
    function createArray(N: number) {
        return Array.from({ length: N }, (_, index) => index + 1);
    }

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const { data }: { data: { users: userInterface[], page: number, totalPages: number, totalUsers: number } } = await axios.get(`${import.meta.env.VITE_URL}users?page=${currentPage}&limit=${usersPerPage} `)
                setUsers([...createArray(data.totalUsers)])
                setInfo({
                    ...info,
                    page: data.page,
                    totalPages: data.totalPages,
                    totalUsers: data.totalUsers,
                    users: [...data.users]
                })
            } catch (err) {
                console.log(err)
            }
        }
        getAllUsers()
    }, [currentPage, usersPerPage])


    const pageCount = Math.ceil(users.length / usersPerPage);

    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected + 1)
    };

    const NextLabel = <div className="bg-blue-600 text-white py-1 px-2 rounded-md">{"Next >"}</div>
    const PreviosLabel = <div className="bg-blue-600 text-white py-1 px-2 rounded-md">{"< Previous"}</div>
    return (
        <>
            <div className='flex flex-wrap gap-y-10 p-4 sm:p-10'>
                {info?.users?.map((user) => <Card user={user} />)}
            </div>
            <hr />
            <div className='py-10'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={NextLabel}
                    previousLabel={PreviosLabel}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    className='flex gap-x-4 items-center justify-center'
                    pageClassName='px-2 bg-gray-300 py-1 rounded-md'
                    activeClassName='bg-blue-500 text-white'
                />
            </div>
        </>
    );
}

export default PaginatedItems