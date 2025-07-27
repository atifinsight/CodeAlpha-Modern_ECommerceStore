"use client"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Header.css"

const Header = ({ user, setUser, cartItemsCount }) => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo Section */}
          <div className="logo-section">
            <Link to="/" className="logo-link" onClick={closeMobileMenu}>
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M9 19C7.9 19 7 19.9 7 21S7.9 23 9 23 11 22.1 11 21 10.1 19 9 19ZM20 19C18.9 19 18 19.9 18 21S18.9 23 20 23 22 22.1 22 21 21.1 19 20 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="logo-text">
                <span className="brand-name">EliteStore</span>
                <span className="brand-tagline">Premium Shopping</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <div className="search-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="search-input"
              />
              <button className="search-button">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className="nav-item">
              <div className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span>Home</span>
            </Link>

            <Link to="/cart" className="nav-item cart-item">
              <div className="cart-icon-container">
                <div className="nav-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
              </div>
              <span>Cart</span>
            </Link>

            {user ? (
              <div className="user-menu-container">
                <button onClick={toggleUserMenu} className="user-menu-trigger">
                  <div className="user-avatar">
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">Customer</span>
                  </div>
                  <div className={`dropdown-arrow ${isUserMenuOpen ? "open" : ""}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-header">
                      <div className="user-avatar-large">
                        <span>{user.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="user-details">
                        <span className="user-display-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-menu">
                      <button className="dropdown-item">My Profile</button>
                      <button className="dropdown-item">My Orders</button>
                      <button onClick={handleLogout} className="dropdown-item logout-item">Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-button login-button">Sign In</Link>
                <Link to="/register" className="auth-button register-button">Sign Up</Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <div className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
          <div className="mobile-search">
            <div className="search-container">
              <div className="search-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input type="text" placeholder="Search products..." className="search-input" />
            </div>
          </div>

          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-item" onClick={closeMobileMenu}>Home</Link>
            <Link to="/cart" className="mobile-nav-item" onClick={closeMobileMenu}>
              Cart ({cartItemsCount})
            </Link>

            {user ? (
              <>
                <div className="mobile-user-info">
                  <div className="user-avatar-large">
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="user-details">
                    <span className="user-display-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </div>
                <button onClick={handleLogout} className="mobile-nav-item logout-item">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-item" onClick={closeMobileMenu}>Sign In</Link>
                <Link to="/register" className="mobile-nav-item" onClick={closeMobileMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
    </>
  )
}

export default Header
