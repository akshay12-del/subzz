import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)'
    }}>
      <Sidebar />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          marginLeft: 0,
          overflowX: 'hidden',
          width: '100%'
        }}
        className="main-content"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
