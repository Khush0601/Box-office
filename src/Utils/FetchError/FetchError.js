import React from 'react'

const FetchError = ({error}) => {
  return (
   <h4 style={{color:'red'}}>😪{error}</h4>
  )
}

export default FetchError