import { FiX, FiCalendar, FiDollarSign, FiTag } from 'react-icons/fi'

function SubscriptionDetailsModal({ subscription, onClose }) {
  if (!subscription) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return {
          bg: 'rgba(34, 197, 94, 0.1)',
          text: '#22c55e',
          darkBg: 'rgba(34, 197, 94, 0.2)',
          darkText: '#4ade80'
        }
      case 'paused':
        return {
          bg: 'rgba(234, 179, 8, 0.1)',
          text: '#eab308',
          darkBg: 'rgba(234, 179, 8, 0.2)',
          darkText: '#facc15'
        }
      case 'cancelled':
        return {
          bg: 'rgba(239, 68, 68, 0.1)',
          text: '#ef4444',
          darkBg: 'rgba(239, 68, 68, 0.2)',
          darkText: '#f87171'
        }
      default:
        return {
          bg: 'var(--bg-tertiary)',
          text: 'var(--text-secondary)',
          darkBg: 'var(--bg-tertiary)',
          darkText: 'var(--text-secondary)'
        }
    }
  }

  const statusColors = getStatusColor(subscription.status)

  const handlePause = () => {
    if (window.confirm('Are you sure you want to pause this subscription?')) {
      alert('Pause functionality is a mock action')
      onClose()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          maxWidth: '500px',
          width: '100%',
          padding: '24px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '40px' }}>{subscription.icon}</span>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                {subscription.name}
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                {subscription.category}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--bg-tertiary)'
              e.target.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = 'var(--text-secondary)'
            }}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Details */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FiDollarSign size={20} style={{ color: 'var(--text-secondary)' }} />
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                Price
              </span>
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'var(--text-primary)'
            }}>
              ${subscription.price.toFixed(2)}/{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
            </span>
          </div>

          {/* Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FiTag size={20} style={{ color: 'var(--text-secondary)' }} />
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                Status
              </span>
            </div>
            <span
              style={{
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor: statusColors.bg,
                color: statusColors.text
              }}
            >
              {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
            </span>
          </div>

          {/* Start Date */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FiCalendar size={20} style={{ color: 'var(--text-secondary)' }} />
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                Start Date
              </span>
            </div>
            <span style={{
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              {new Date(subscription.startDate).toLocaleDateString()}
            </span>
          </div>

          {/* Next Billing */}
          {subscription.nextBilling && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FiCalendar size={20} style={{ color: 'var(--text-secondary)' }} />
                <span style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  fontWeight: '500'
                }}>
                  Next Billing
                </span>
              </div>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                {new Date(subscription.nextBilling).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 24px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--bg-tertiary)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            Close
          </button>
          {subscription.status === 'active' && (
            <button
              onClick={handlePause}
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: '#eab308',
                border: 'none',
                borderRadius: '8px',
                color: '#000000',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ca8a04'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#eab308'
              }}
            >
              Pause
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionDetailsModal
