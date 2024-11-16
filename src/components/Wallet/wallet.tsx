'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { PieChart, Pie, Cell, Legend } from 'recharts'

// Mock data for wallet
const mockWalletData = {
  pendingPayments: 1500,
  approvedPayments: 3000,
  availableBalance: 2500,
  transactions: [
    { id: 1, amount: 500, date: '2023-06-01', status: 'Pending' },
    { id: 2, amount: 1000, date: '2023-06-05', status: 'Approved' },
    { id: 3, amount: 750, date: '2023-06-10', status: 'Pending' },
  ],
  monthlyEarnings: [
    { month: 'Jan', amount: 1000 },
    { month: 'Feb', amount: 1500 },
    { month: 'Mar', amount: 2000 },
    { month: 'Apr', amount: 1800 },
    { month: 'May', amount: 2200 },
    { month: 'Jun', amount: 2500 },
  ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function WalletComponent() {
  const [walletData, setWalletData] = useState(mockWalletData)

  const handleWithdrawal = () => {
    // Implement withdrawal logic here
    console.log('Withdrawal requested')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <WalletCard title="Pending Payments" amount={walletData.pendingPayments} />
        <WalletCard title="Approved Payments" amount={walletData.approvedPayments} />
        <WalletCard title="Available Balance" amount={walletData.availableBalance} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={walletData.monthlyEarnings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pending', value: walletData.pendingPayments },
                    { name: 'Approved', value: walletData.approvedPayments },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {
                    [{ name: 'Pending' }, { name: 'Approved' }].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {walletData.transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'Approved' ? 'success' : 'default'}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Button onClick={handleWithdrawal}>Request Withdrawal</Button>
      </div>
    </div>
  )
}

function WalletCard({ title, amount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
      </CardContent>
    </Card>
  )
}