import { FaUserGroup } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setValue } from "../features/user/userSlice";

const Teams = () => {
    const userCount = useAppSelector((state) => state.user.value)
    const dispatch = useAppDispatch()
    return (
        <Link to="/teams" className='flex items-center gap-x-1 ml-4 hover:text-blue-600 relative'
            onClick={() => dispatch(setValue(0))}
        >
            <div className="relative">
                <FaUserGroup
                    cursor="pointer"
                    size={25}
                    className="mr-2"
                />
                <span className="bg-green-500 text-white  rounded-xl inline-block px-1 py-[2px] text-xs -top-[50%] absolute z-[99] left-[50%]">{userCount}</span>
            </div>
            <span className='text-sm hidden sm:inline-block'>Teams</span>
        </Link>
    )
}

export default Teams
