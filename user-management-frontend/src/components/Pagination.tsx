import ReactPaginate from 'react-paginate'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type propTypes = {
    handlePageClick: (event: any) => void,
    pageCount: number,
}
const Pagination = ({ handlePageClick, pageCount }: propTypes) => {
    return (
        <div className='py-10  text-xs sm:text-sm '>
            <ReactPaginate
                breakLabel="..."
                nextLabel={NextLabel}
                previousLabel={PreviosLabel}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                className='flex gap-x-2 sm:gap-x-4 md:gap-x-8 items-center justify-center'
                pageClassName='px-1 sm:px-2 bg-gray-300 py-1 rounded-md '
                activeClassName='bg-green-500 text-white'
            />
        </div>
    )
}

export default Pagination

const NextLabel = <div className="bg-blue-600 text-white px-2 rounded-md py-2">
    <FaAngleRight />
</div>
const PreviosLabel = <div className="bg-blue-600 text-white py-2 px-2 rounded-md">
    <FaAngleLeft />

</div>