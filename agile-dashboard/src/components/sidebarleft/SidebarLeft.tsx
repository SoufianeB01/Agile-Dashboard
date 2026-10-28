
import { useState } from 'react'
import './SidebarLeft.css'

function SidebarLeft() {
  const [activePage, setActivePage] = useState('Dashboard')

  const menuItems = [
    { name: 'Dashboard', icon: '▦' },
    { name: 'My Tasks', icon: '☷' },
    { name: 'Profile', icon: '♙' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">S</div>
        <span>SprintFlow</span>
      </div>

      <div className="sidebar-section-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-nav-item ${
              activePage === item.name ? 'active' : ''
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-avatar">SB</div>
        <div className="user-details">
          <span className="user-name">Soufiane</span>
          <span className="user-role">Developer</span>
        </div>
      </div>
    </aside>
  )
}

export default SidebarLeft
