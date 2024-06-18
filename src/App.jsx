import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import GlobalStyles from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Login from './pages/Login'
import Users from './pages/Users'
import Settings from './pages/Settings'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { Toaster } from 'react-hot-toast'
import Booking from './pages/Booking'
import CheckIn from './pages/CheckIn'
import ProtectedRoute from './ui/ProtectedRoute'
import { DarkModeProvider } from './context/DarkModeContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      // data takes 60s to become stale (invalid and old)
      // after 60s it will be refetched again
      staleTime: 0,
      // now, the data is always stale, as soon as it changes, it will refetch again (fresh data)
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <GlobalStyles />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate replace to="/dashboard" />}
              />
              {/* when navigating to '/' (default route) it will redirect to '/dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account" element={<Account />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route
                path="/bookings/:bookingId"
                element={<Booking />}
              />
              <Route
                path="/checkIn/:bookingId"
                element={<CheckIn />}
              />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </QueryClientProvider>
  )
}

export default App
