import Navigation from '@/components/navigation/NavigationMenu'
import React from 'react'


const AccountPage = () => {
  return (
    <div className="flex flex-col h-screen justify-top pt-7 space-y-7 items-center">
      <div className='flex flex-col space-y-3 items-center'>
        <h4 className="text-3xl text-bold">YUMMY PIZZA</h4>
        <Navigation />
      </div> 

      <div>
        <p>ACCOUNT</p>
      </div> 
      
    </div>
    )
}

export default AccountPage
