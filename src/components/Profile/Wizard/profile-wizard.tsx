'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { completeProfile } from './actions'

const steps = ['Basic Business Details', 'Verification Details', 'Payment Setup']

export function ProfileWizardComponent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(new FormData())
  const router = useRouter()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    const result = await completeProfile(formData)
    if (result.success) {
      router.push('/dashboard')
    } else {
      console.error('Failed to complete profile')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.set(e.target.name, e.target.value)
    setFormData(new FormData(formData))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formData.set(e.target.name, e.target.files[0])
      setFormData(new FormData(formData))
    }
  }

  const handleSelectChange = (value: string, name: string) => {
    formData.set(name, value)
    setFormData(new FormData(formData))
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {currentStep === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" name="businessName" required onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select name="businessType" onValueChange={(value) => handleSelectChange(value, 'businessType')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessLocation">Business Location</Label>
                <Input id="businessLocation" name="businessLocation" required onChange={handleInputChange} />
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nin">National Identification Number (NIN)</Label>
                <Input id="nin" name="nin" required onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessLicense">Upload Business License</Label>
                <Input id="businessLicense" name="businessLicense" type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">Bank Account Number (Optional)</Label>
                <Input id="bankAccount" name="bankAccount" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdrawalMethod">Preferred Withdrawal Method</Label>
                <Select name="withdrawalMethod" onValueChange={(value) => handleSelectChange(value, 'withdrawalMethod')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select withdrawal method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
        <Button onClick={handleNext}>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
      </CardFooter>
    </Card>
  )
}