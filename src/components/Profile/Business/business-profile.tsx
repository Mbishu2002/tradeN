'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for business profile
const mockBusinessProfile = {
  name: 'Acme Inc.',
  logo: '/placeholder.svg?height=100&width=100',
  location: '123 Business St, City, Country',
  email: 'contact@acmeinc.com',
  phone: '+1 234 567 8900',
  description: 'We are a leading provider of innovative solutions.',
  vacationMode: false,
}

export function BusinessProfileComponent() {
  const [profile, setProfile] = useState(mockBusinessProfile)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleVacationModeToggle = () => {
    setProfile({ ...profile, vacationMode: !profile.vacationMode })
  }

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving profile:', profile)
    setIsEditing(false)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Implement file upload logic here
      console.log('Uploading file:', file.name)
      // For demo purposes, we're just updating the logo URL
      setProfile({ ...profile, logo: URL.createObjectURL(file) })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Business Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Manage your business details and settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.logo} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{profile.name}</h2>
                {isEditing && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="vacation-mode"
                checked={profile.vacationMode}
                onCheckedChange={handleVacationModeToggle}
                disabled={!isEditing}
              />
              <Label htmlFor="vacation-mode">Enable Vacation Mode</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}