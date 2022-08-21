import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
const UserContext = React.createContext([{}, () => { }])

const UserProvider = (props) => {
    const [state, setState] = useState(false)
    const navigate = useNavigate()

    useEffect(async () => {
        const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/users/check", {
            credentials: 'include'
        })
        if (res.status == 200) setState(true)
        else setState(false)
    }, [])

    const register = async (data) => {
        const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/users/register", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        var body = await res.text()
        if (res.status == 200) {
            toast.success(body)
            setState(true)
            navigate("/")
        } else toast.error(body)
    }

    const login = async (data) => {
        const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/users/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        var body = await res.text()
        if (res.status == 200) {
            toast.success(body)
            setState(true)
            navigate("/")
        }
        else toast.error(body)
    }

    const logout = async () => {
        const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/users/logout", {
            credentials: 'include'
        })
        var body = await res.text()
        if (res.status == 200) {
            toast.success(body)
            setState(false)
            navigate("/")
        }
        else toast.error(body)
    }

    const globalState = {
        state,
        setState,
        register,
        login,
        logout
    }

    return (
        <>
            <UserContext.Provider value={globalState}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}

export { UserContext, UserProvider }