type propTypes = {
    user: {
        id: number
        avatar: string,
        first_name: string,
        last_name: string,
        available: boolean,
        gender: string
        domain:string
    }
}
const Card = ({ user: { avatar, available, first_name, last_name, id, gender, domain } }: propTypes) => {
    return (
        <div
            key={id}
            className="mx-auto sm:ml-6 sm:min-w-[200px]   shadow-md w-[90%] sm:w-[45%]  md:w-1/4 lg:w-1/6 xl:w-1/12 lg:bg-gray-50  p-4 rounded-md  ">
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
