import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="container flex flex-col gap-y-[4rem] justify-center items-center">
      <div className="flex-col-1 justify-center items-center">
        <h1>Noteworthy</h1>
        <p className='h4'>A Note-taking web app.</p>
      </div>
      <div className="flex gap-[1rem]">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Singup</Link>
      </div>
    </div>
  )
}

export default HomePage