import React from 'react'
import accimg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddressTab from '@/components/shopping_view/address'
import ShoppingOrderTab from '@/components/shopping_view/order'

function ShoppingAccount() {

  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
      <img src={accimg} className='h-full w-full object-cover object-center'/>
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 p-5'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue="orders">
            <TabsList >
              <TabsTrigger value="orders" className="cursor-pointer">Orders</TabsTrigger>
              <TabsTrigger value="address" className="cursor-pointer">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrderTab/>
            </TabsContent>
            <TabsContent value="address">
              <AddressTab/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount