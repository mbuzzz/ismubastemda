import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', label: 'Beranda', icon: '🏠' },
    { path: '/perangkat', label: 'Perangkat', icon: '📄' },
    { path: '/materi', label: 'Materi', icon: '📖' },
    { path: '/tentang', label: 'Tentang', icon: 'ℹ️' }
  ];

  return (
    <div className="app-container">
      {/* Desktop Navbar */}
      {!isMobile && (
        <nav className="desktop-navbar">
          <div className="navbar-brand">
            <Link to="/" style={{ textDecoration: 'none', color: '#0D47A1', fontWeight: '800', fontSize: '20px', letterSpacing: '1px' }}>
              ISMUBA STEMDA
            </Link>
          </div>
          <div className="navbar-menu">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`nav-link ${location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className={`main-content-area ${isMobile ? 'mobile-padding' : 'desktop-padding'}`}>
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="bottom-navbar">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`bottom-nav-item ${location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 'active' : ''}`}
            >
              <span className="bottom-nav-icon">{item.icon}</span>
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default MainLayout;
