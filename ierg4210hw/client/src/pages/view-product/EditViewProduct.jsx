// import React from 'react'

import { useParams } from "react-router"


const EditViewProduct = () => {

    const { pid } = useParams()
    

  return (
    <div>
        {pid}
    </div>
  )
}

export default EditViewProduct