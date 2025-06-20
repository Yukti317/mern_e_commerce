import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import Adminheader from './header'

function Adminlayout() {
  const [openSidebar, setOpensidebar] = useState(false)
  return (
    <>
        <div className='flex min-h-screen w-full'>
            {/* admin side bar */}
            <Adminsidebar open={openSidebar} setopen={setOpensidebar}/>
            <div className='flex flex-1 flex-col'>
                {/* admin header */}
                <Adminheader open={openSidebar} setopen={setOpensidebar}/>
                {/* main content */}
                <main className='flex flex-col flex-1 bg-[rgba(243,244,246,0.4)] p-4 md:p-6 '>
                    <Outlet/>
                </main>
            </div>
        </div>
    </>
  )
}

export default Adminlayout