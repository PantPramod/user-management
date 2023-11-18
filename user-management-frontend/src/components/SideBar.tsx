import axios from 'axios'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'

type propTypes = {
    filters: {
        domain: string,
        gender: string,
        available: string
    }
    setFilters: Dispatch<SetStateAction<{ domain: string; gender: string; available: string; }>>
}
const SideBar = ({ filters, setFilters }: propTypes) => {
    const [domains, setDomains] = useState<string[]>([])

    useEffect(() => {
        const getAllDomains = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_URL}users/alldomains`)
                setDomains([...data])
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        getAllDomains()

    }, [])
    return (
        <div className='w-full  px-4 max-w-[230px] border-r border-gray-300'>
            <h3 className='uppercase mt-5 font-semibold '>Filters</h3>
            <div className=' mt-5'>
                <p>Domain</p>
                <select
                    value={filters?.domain}
                    onChange={(e) => setFilters({ ...filters, domain: e.target.value })}
                    className='w-full border border-gray-400 p-2  rounded-md outline-none'>
                    <option value={""}>Select</option>
                    {
                        domains?.map((domain: string) =>
                            <option value={domain} key={domain}>{domain}</option>
                        )
                    }
                </select>
            </div>

            <div className='mt-5'>
                <p>Gender</p>
                <select
                    value={filters?.gender}
                    onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                    className='w-full border border-gray-400 p-2   rounded-md outline-none'>
                    <option value={""}>Select</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                </select>
            </div>

            <div className='mt-5'>
                <p>Availability</p>
                <select
                    value={filters?.available}
                    onChange={(e) => setFilters({ ...filters, available: e.target.value })}
                    className='w-full border border-gray-400 p-2  rounded-md outline-none'>
                    <option value={""}>Select</option>
                    <option value={"true"}>Available</option>
                    <option value={"false"}>Not Available</option>
                </select>
            </div>


        </div>
    )
}

export default SideBar
