import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserProvider } from './utils/auth/UserProvider'
import { ProtectedRoute } from './utils/auth/ProtectedRoute'
import { SignUp } from './pages/features/auth/SignUp'
import { FrappeProvider } from 'frappe-react-sdk'
import { LogIn } from './pages/features/auth/LogIn'

function App() {

  return (
    <div className="App">
      <FrappeProvider url={'http://localhost:8001' ?? ''}>
        <BrowserRouter >
          <UserProvider>
            <Routes>
              {/** Public Routes */}
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<LogIn />} />

              {/** Private Routes */}
              <Route path="/" element={<ProtectedRoute />} />
              <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </FrappeProvider>
    </div>
  )
}

export default App
