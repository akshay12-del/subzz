import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useFontScale } from '../context/FontScaleContext'
import { FiMoon, FiSun, FiMonitor, FiLock, FiTrash2 } from 'react-icons/fi'
import ChangePasswordModal from '../components/modals/ChangePasswordModal'
import DeleteAccountModal from '../components/modals/DeleteAccountModal'

function Settings() {
  const { theme, setTheme } = useTheme()
  const { fontScale, setFontScale } = useFontScale()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const themeOptions = [
    { value: 'light', label: 'Light', icon: FiSun },
    { value: 'dark', label: 'Dark', icon: FiMoon },
    { value: 'system', label: 'System', icon: FiMonitor },
  ]

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          Settings
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '16px'
        }}>
          Manage your account preferences
        </p>
      </div>

      {/* Appearance Section */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 2px 8px var(--shadow)',
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '24px'
        }}>
          Appearance
        </h2>

        {/* Theme Selection */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}>
            Theme
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px'
          }}>
            {themeOptions.map((option) => {
              const Icon = option.icon
              const isSelected = theme === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    border: `2px solid ${isSelected ? 'var(--text-primary)' : 'var(--border-color)'}`,
                    backgroundColor: isSelected ? 'var(--text-primary)' : 'transparent',
                    color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.target.style.borderColor = 'var(--text-primary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.target.style.borderColor = 'var(--border-color)'
                    }
                  }}
                >
                  <Icon size={24} />
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {option.label}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Font Size Slider */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)'
            }}>
              Font Size
            </label>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              {fontScale}%
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={fontScale}
            onChange={(e) => setFontScale(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '4px',
              outline: 'none',
              cursor: 'pointer',
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
            className="font-slider"
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-tertiary)',
            marginTop: '8px'
          }}>
            <span>50%</span>
            <span>100%</span>
            <span>200%</span>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 2px 8px var(--shadow)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '20px'
        }}>
          Account
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Change Password */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                padding: '10px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiLock size={20} style={{ color: 'var(--text-primary)' }} />
              </div>
              <div>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}>
                  Change Password
                </p>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)'
                }}>
                  Update your account password
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9'
                e.target.style.transform = 'scale(1.02)'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1'
                e.target.style.transform = 'scale(1)'
              }}
            >
              Change
            </button>
          </div>

          {/* Delete Account */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                padding: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiTrash2 size={20} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#ef4444',
                  marginBottom: '4px'
                }}>
                  Delete Account
                </p>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(239, 68, 68, 0.8)'
                }}>
                  Permanently delete your account and all data
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dc2626'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ef4444'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  )
}

export default Settings
