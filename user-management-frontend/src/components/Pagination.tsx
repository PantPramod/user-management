import ReactPaginate from 'react-paginate'

type propTypes = {
    handlePageClick: (event:any) => void,
    pageCount: number,
}
const Pagination = ({ handlePageClick, pageCount }: propTypes) => {
    return (
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
                activeClassName='bg-green-500 text-white'
            />
        </div>
    )
}

export default Pagination

const NextLabel = <div className="bg-blue-600 text-white py-1 px-2 rounded-md">{"Next >"}</div>
const PreviosLabel = <div className="bg-blue-600 text-white py-1 px-2 rounded-md">{"< Previous"}</div>