import { Dispatch, SetStateAction } from "react"
import { userInterface } from "../App"

type propTypes = {
    user: userInterface,
    selectedUsers: userInterface[]
    setSelectedUsers: Dispatch<SetStateAction<userInterface[]>>
    index?: number

}

const Card = ({ user,
    setSelectedUsers,
    selectedUsers,

}: propTypes) => {
    const { _id, avatar, available, first_name, last_name, id, gender, domain } = user

    const isExist = () => {
        let userExist = false
        let selectedUserslength = selectedUsers.length
        for (let i = 0; i < selectedUserslength; i++) {
            if (selectedUsers[i]._id === _id) {
                userExist = true;
                break;
            }
        }

        return userExist
    }

    const getIndex = () => {
        let selectedUserslength = selectedUsers.length
        for (let i = 0; i < selectedUserslength; i++) {
            if (selectedUsers[i]._id === _id) {
                return i

            }
        }
        return -1
    }

    const isDomainPresent = () => {
        let selectedUserslength = selectedUsers.length
        for (let i = 0; i < selectedUserslength; i++) {
            if (selectedUsers[i].domain === domain) {
                return true
            }
        }
        return false
    }
    return (
        <div
            onClick={() => {
                if (!available) {
                    alert("User is not available")
                    return;
                }
                if (getIndex() === -1) {
                    if (isDomainPresent()) {
                        alert("Same Domain Already Present!")
                        return;
                    }
                    setSelectedUsers([...selectedUsers, user])

                } else {
                    let index = getIndex()
                    selectedUsers.splice(index, 1)
                    setSelectedUsers([...selectedUsers])
                }
            }}
            key={_id}
            style={isExist() ? { border: "2px solid green" } : {}}
            className={` mx-auto sm:ml-6 sm:min-w-[200px] shadow-md w-[90%] sm:w-[45%]  md:w-1/4 lg:w-1/6 xl:w-1/12 lg:bg-gray-50  p-4 rounded-md cursor-pointer `}>
            <p>{id}</p>
            <div className={`ml-auto ${available ? "bg-green-500" : "bg-gray-400"} rounded-full w-3 h-3 `}></div>
            <img
                src={avatar}
                alt={first_name}
                className="mx-auto"
            />
            <p className="text-center mt-3 whitespace-nowrap text-sm font-semibold">{`${first_name} ${last_name}`}</p>
            <p className="text-center mt-1 whitespace-nowrap text-xs text-gray-600">Gender : {gender}</p>
            <p className="text-center mt-1 whitespace-nowrap text-xs text-gray-600">Domain : {domain}</p>
        </div>
    )
}

export default Card
