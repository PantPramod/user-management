import axios from 'axios'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { IoIosClose } from "react-icons/io";

export type propTypes = {
    filters: {
        domain: string[],
        gender: string,
        available: string
    }
    setFilters: Dispatch<SetStateAction<{ domain: string[]; gender: string; available: string; }>>
    setShowFilters: Dispatch<SetStateAction<boolean>>
    showFilters: boolean
}

export interface filtersInterface {
    domain: string[],
    gender: string,
    available: string,

}
const SideBar = ({ filters, setFilters, setShowFilters, showFilters }: propTypes) => {
    const [domains, setDomains] = useState<string[]>([])

    useEffect(() => {
        const getAllDomains = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_URL}users/alldomains`)
                setDomains([...data])
                // console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        getAllDomains()

    }, [])

    return (
        <div className={`text-sm w-full bg-gray-300 sm:bg-white  px-4 sm:max-w-[230px] pb-5 border-r border-gray-300 ${showFilters ? "" : "hidden"} sm:block`}>
            <h3 className='uppercase mt-5 font-semibold flex justify-between items-center'>
                <span>Filters</span>
                <IoIosClose
                    cursor="pointer"
                    onClick={() => setShowFilters(false)}
                    size={30}
                    className="sm:hidden"
                />
            </h3>
            <div className=' mt-5'>
                <p className='flex justify-between items-center'>
                    <span>Domain</span>
                    <IoIosClose
                        cursor="pointer"
                        onClick={() => setFilters({ ...filters, domain: [] })}
                        size={25}
                    />

                </p>
                {
                    domains?.map((domain: string) => <div className='mt-1'>
                        <input
                            checked={filters.domain.includes(domain)}
                            id={domain}
                            type='checkbox'
                            className='cursor-pointer'
                            value={domain}
                            onChange={() => {
                                if (filters.domain.indexOf(domain) === -1) {
                                    filters.domain.push(domain)
                                } else {
                                    let index = filters.domain.indexOf(domain);
                                    filters.domain.splice(index, 1)

                                }
                                setFilters((prev) => { return { ...prev, domain: [...prev.domain] } })

                            }}
                        />
                        <label className='inline-blocl ml-3 cursor-pointer' htmlFor={domain}>{domain}</label>
                    </div>)
                }
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
