/* eslint-disable react/prop-types */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({children}) { // using this function to wrap all the pages
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
      // console.log("idk why user is null...", user);
      if(!user) {
        axios.get('/auth/get_user_profile').then(({data}) => {
            // console.log(data, 123); // an object
        //   const { name } = data
          setUser(data)
          setReady(true)
        })
      }
    }, [user])

  return (
    <UserContext.Provider value={{user, setUser, ready}}>
        {children}
    </UserContext.Provider>
  )
}