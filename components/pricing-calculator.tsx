'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PricingCalculator() {
  const [seats, setSeats] = useState(1)
  const [usage, setUsage] = useState(0)
  const [discountTier, setDiscountTier] = useState('none')
  const [totalPrice, setTotalPrice] = useState(0)

  const basePrice = 10 // Price per seat
  const usageRate = 0.05 // Price per unit of usage
  const discounts = {
    none: 0,
    small: 0.1,
    medium: 0.15,
    large: 0.2
  }

  useEffect(() => {
    const seatCost = seats * basePrice
    const usageCost = usage * usageRate
    const subtotal = seatCost + usageCost
    const discount = subtotal * discounts[discountTier]
    const total = subtotal - discount
    setTotalPrice(total)
  }, [seats, usage, discountTier])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">SaaS Pricing Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seats">Number of Seats</Label>
          <Input
            id="seats"
            type="number"
            min="1"
            value={seats}
            onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="usage">Usage (units)</Label>
          <Input
            id="usage"
            type="number"
            min="0"
            value={usage}
            onChange={(e) => setUsage(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount">Discount Tier</Label>
          <Select value={discountTier} onValueChange={setDiscountTier}>
            <SelectTrigger id="discount">
              <SelectValue placeholder="Select a discount tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="small">Small (10%)</SelectItem>
              <SelectItem value="medium">Medium (15%)</SelectItem>
              <SelectItem value="large">Large (20%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Price Breakdown</h3>
          <div className="space-y-1 text-sm">
            <p>Seat Cost: ${(seats * basePrice).toFixed(2)}</p>
            <p>Usage Cost: ${(usage * usageRate).toFixed(2)}</p>
            <p>Discount: ${((seats * basePrice + usage * usageRate) * discounts[discountTier]).toFixed(2)}</p>
          </div>
          <div className="text-xl font-bold mt-4">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}