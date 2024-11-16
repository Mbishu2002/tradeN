'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, MessageCircle, ShoppingBag, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export function LandingPageComponent() {
  const [isTyping, setIsTyping] = useState(true)
  const [typedText, setTypedText] = useState('')
  const fullText = "Hey, I'm looking for a red dress"

  useEffect(() => {
    if (isTyping) {
      const timeout = setTimeout(() => {
        if (typedText.length < fullText.length) {
          setTypedText(fullText.slice(0, typedText.length + 1))
        } else {
          setIsTyping(false)
          setTimeout(() => {
            setTypedText('')
            setIsTyping(true)
          }, 3000)
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [typedText, isTyping])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-green-600">NanoTrade</div>
          <div className="space-x-4">
            <Link href="#" className="text-green-600 hover:text-green-800">About</Link>
            <Link href="#" className="text-green-600 hover:text-green-800">FAQs</Link>
            <Link href="#" className="text-green-600 hover:text-green-800">Contact</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Sell Smarter, Search Faster!</h1>
              <p className="text-xl mb-8">Vendors upload products on our site; customers find them easily through WhatsApp.</p>
              <div className="space-x-4">
                <Button size="lg">Get Started as a Vendor</Button>
                <Button size="lg" variant="outline">Find Products on WhatsApp</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <img src="/placeholder.svg?height=200&width=200" alt="Vendor uploading product" className="w-full h-auto rounded-lg mb-2" />
                  <p className="text-center">Vendor Platform</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <img src="/placeholder.svg?height=200&width=200" alt="Customer searching on WhatsApp" className="w-full h-auto rounded-lg mb-2" />
                  <p className="text-center">WhatsApp Search</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Connecting Vendors and Shoppers Effortlessly</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">For Vendors:</h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <ShoppingBag className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Sign Up & Verify</h4>
                      <p>Register your business and verify your identity for secure transactions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <ArrowRight className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Upload Products</h4>
                      <p>Add your products with descriptions, prices, and stock details.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">For Customers:</h3>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Search on WhatsApp</h4>
                      <p>Send a simple message to our WhatsApp number to search for products instantly.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <ShoppingBag className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Order with Ease</h4>
                      <p>Choose a product, place your order, and wait for delivery confirmation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShoppingBag, title: "Vendor-Friendly Platform", description: "Easily upload, manage, and track your products in one place." },
                { icon: MessageCircle, title: "Search Integration with WhatsApp", description: "Reach millions of WhatsApp users with just a few clicks." },
                { icon: Shield, title: "Secure Escrow System", description: "Payments are held until customers confirm delivery." },
                { icon: Zap, title: "Fast and Reliable", description: "Optimized for seamless search and transactions." },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "John Doe", role: "Vendor", content: "I uploaded my products, and within days, customers started placing orders through WhatsApp. The process is so simple!" },
                { name: "Jane Smith", role: "Customer", content: "I searched for what I needed on WhatsApp and found it instantly. Great experience!" },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Get Started Today!</h2>
            <div className="max-w-2xl mx-auto mb-8">
              <p className="mb-4">Sign up to upload your products and reach customers directly.</p>
              <p>Search and order your favorite products on WhatsApp now.</p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary">Vendor Sign-Up</Button>
              <Button size="lg" variant="outline">Start Searching on WhatsApp</Button>
            </div>
          </div>
        </section>

        {/* WhatsApp Chat Simulation */}
        <section className="fixed bottom-4 right-4 z-50">
          <Card className="w-64">
            <CardContent className="p-4">
              <div className="bg-green-500 text-white p-2 rounded-t-lg">
                <h3 className="font-semibold">WhatsApp Search</h3>
              </div>
              <div className="h-32 overflow-y-auto bg-gray-100 p-2">
                <div className="bg-white rounded-lg p-2 mb-2 max-w-[80%]">
                  How can I help you today?
                </div>
                <div className="bg-green-100 rounded-lg p-2 mb-2 max-w-[80%] ml-auto">
                  {typedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </div>
              </div>
              <div className="mt-2 flex">
                <Input placeholder="Type a message..." className="flex-grow mr-2" />
                <Button size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-green-600">About</Link></li>
                <li><Link href="#" className="hover:text-green-600">FAQs</Link></li>
                <li><Link href="#" className="hover:text-green-600">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-green-600">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect with Us</h3>
              <Button variant="outline" className="mb-2">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat with us on WhatsApp
              </Button>
              <div className="flex space-x-4 mt-4">
                {['facebook', 'instagram', 'linkedin'].map((social) => (
                  <Link key={social} href="#" className="text-gray-400 hover:text-green-600">
                    <img src={`/${social}-icon.svg`} alt={`${social} icon`} className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <p>Email: support@whatsappsearch.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="mb-2">Stay updated with our latest features and offers.</p>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="mr-2" />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © 2023 WhatsApp Search Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}