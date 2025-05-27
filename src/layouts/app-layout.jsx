import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/ui/header'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen container'>
            <Header/>
            <Outlet />
        </main>
        
    </div>
  )
}

export default AppLayout