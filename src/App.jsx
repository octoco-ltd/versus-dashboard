import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

function App() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://revx-leads-api.azurewebsites.net/api/TwilioWebhook/dashboard')
      .then(response => response.json())
      .then(data => {
        setDashboardData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Prepare data for histogram
  const chartData = dashboardData?.totals ? [
    { name: 'Receipts Scanned', value: dashboardData.totals.receiptsScanned, color: '#3b82f6' },
    { name: 'Names Collected', value: dashboardData.totals.namesCollected, color: '#10b981' },
    { name: 'Emails Collected', value: dashboardData.totals.emailsCollected, color: '#f59e0b' },
    { name: 'Unique Participants', value: dashboardData.totals.uniqueParticipants, color: '#8b5cf6' },
    { name: 'Total Packs', value: dashboardData.totals.totalPacks, color: '#ec4899' },
    { name: 'Total Entries', value: dashboardData.totals.totalEntries, color: '#06b6d4' },
  ] : []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Versus Dashboard</h1>
              <p className="text-gray-300 mt-1">RevX Leads Analytics</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Data</h3>
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Receipts Scanned</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {dashboardData?.totals?.receiptsScanned || 0}
                    </p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Names Collected</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {dashboardData?.totals?.namesCollected || 0}
                    </p>
                  </div>
                  <div className="bg-green-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Emails Collected</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {dashboardData?.totals?.emailsCollected || 0}
                    </p>
                  </div>
                  <div className="bg-amber-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Unique Participants</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {dashboardData?.totals?.uniqueParticipants || 0}
                    </p>
                  </div>
                  <div className="bg-purple-100 rounded-full p-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Histogram Chart */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Distribution</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Count" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Conversion Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Name Collection Rate</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-green-600">
                    {dashboardData?.totals?.receiptsScanned > 0 
                      ? Math.round((dashboardData.totals.namesCollected / dashboardData.totals.receiptsScanned) * 100)
                      : 0}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {dashboardData?.totals?.namesCollected} / {dashboardData?.totals?.receiptsScanned}
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${dashboardData?.totals?.receiptsScanned > 0 
                        ? (dashboardData.totals.namesCollected / dashboardData.totals.receiptsScanned) * 100
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Email Collection Rate</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-amber-600">
                    {dashboardData?.totals?.receiptsScanned > 0 
                      ? Math.round((dashboardData.totals.emailsCollected / dashboardData.totals.receiptsScanned) * 100)
                      : 0}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {dashboardData?.totals?.emailsCollected} / {dashboardData?.totals?.receiptsScanned}
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${dashboardData?.totals?.receiptsScanned > 0 
                        ? (dashboardData.totals.emailsCollected / dashboardData.totals.receiptsScanned) * 100
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Participation Rate</h3>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-purple-600">
                    {dashboardData?.totals?.receiptsScanned > 0 
                      ? Math.round((dashboardData.totals.uniqueParticipants / dashboardData.totals.receiptsScanned) * 100)
                      : 0}%
                  </div>
                  <div className="text-sm text-gray-600">
                    {dashboardData?.totals?.uniqueParticipants} / {dashboardData?.totals?.receiptsScanned}
                  </div>
                </div>
                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${dashboardData?.totals?.receiptsScanned > 0 
                        ? (dashboardData.totals.uniqueParticipants / dashboardData.totals.receiptsScanned) * 100
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-400">© 2025 Versus Dashboard. Built with React + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default App
