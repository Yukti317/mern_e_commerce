import React from 'react'
import { Outlet } from 'react-router-dom'

function Authlayout() {
  return (
    <>
        <div className='flex min-h-screen w-full'>
            <div className='hideen lg:flex items-center justify-center bg-black w-1/2 px-12 '>
                <div className='max-w-md space-y-6 text-center text-primary-foreground'> 
                <h1 className='text-4xl font-extrabold tracking-tight'>Welecome to ClothingStoree...</h1>
                </div>
            </div>
            <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6'>
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default Authlayout