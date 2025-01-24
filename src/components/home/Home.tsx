"use client"

import { QRCodeSVG } from "qrcode.react"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserChart } from "./user-chart"

export default function Dashboard() {

  

  return (
    <div className={`min-h-screen p-8 bg-background`}>
      <div className="container mx-auto">
      <h1 className="text-2xl xl:text-4xl mb-4 -mt-4">Welcome to XYZ Gym Centre</h1>

        <div className="flex justify-end mb-4">
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Total Revenue Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">$45,231.89</p>
                <p className="text-sm text-green-500 mt-1">+20.1% from last month</p>
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">Subscriptions</p>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">+2350</p>
                <p className="text-sm text-green-500 mt-1">+160.1% from last month</p>
              </div>
            </CardContent>
          </Card>

          {/* Sales Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">Sales</p>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">+12,234</p>
                <p className="text-sm text-green-500 mt-1">+19% from last month</p>
              </div>
            </CardContent>
          </Card>

          {/* Active Now Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <p className="text-sm text-muted-foreground">Active Now</p>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">+573</p>
                <p className="text-sm text-green-500 mt-1">+201 since last hour</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart and QR Code Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Chart */}
          <div className="col-span-1 md:col-span-3">
            <UserChart />
          </div>

          {/* QR Code */}
          <Card className="col-span-1 md:col-span-2 bg-card">
          <CardHeader className="text-center text-2xl">Make a Secure Payment</CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center p-8">
              <QRCodeSVG value="https://example.com" size={300} className="w-full h-full max-w-[400px]" level="H" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

