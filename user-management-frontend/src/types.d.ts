import {Dispatch, SetStateAction} from 'react'

export interface userInterface {
    _id: string
    id: number
    first_name: string
    last_name: string
    email: string
    available: boolean
    domain: string
    avatar: string
    gender: string

}

export type dataType = {
    users: userInterface[],
    page: number,
    totalPages: number,
    totalUsers: number
}

export type teamTypes={
    _id:string,
    title:string,
    userId:userInterface[],
}

export interface filtersInterface {
    domain: string[],
    gender: string,
    available: string,

}

export type sideBarPropTypes = {
    filters: {
        domain: string[],
        gender: string,
        available: string
    }
    setFilters: Dispatch<SetStateAction<{ domain: string[]; gender: string; available: string; }>>
    setShowFilters: Dispatch<SetStateAction<boolean>>
    showFilters: boolean
}

export type cardPropTypes = {
    user: userInterface,
    selectedUsers: userInterface[]
    setSelectedUsers: Dispatch<SetStateAction<userInterface[]>>
    index?: number
}