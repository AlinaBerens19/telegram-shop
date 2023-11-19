'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button"
  


const MenuItem = () => {
  return (
    <Card className="lg:w-1/4 lg:h-1/4">
        <CardHeader>
            <CardTitle>Pepperoni</CardTitle>
            <CardDescription>Pepperoni, basil, cheddar</CardDescription>
        </CardHeader>
        <CardContent>
            <img src="/images/pepperoni.jpg" alt="Pizza" />
        </CardContent>
        <CardFooter>
            <Button>Order</Button>
        </CardFooter>
     </Card>

  )
}

export default MenuItem
