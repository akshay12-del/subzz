import { FiX, FiCheck, FiTag } from 'react-icons/fi'

function ApplyBundleModal({ bundle, onClose, onApply }) {
  if (!bundle) return null

  const handleApply = () => {
    onApply(bundle)
    onClose()
  }

  const savings = bundle.originalPrice - bundle.discountedPrice

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
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'var(--text-primary)'
          }}>
            Bundle Offer
          </h2>
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

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Bundle Name and Description */}
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              {bundle.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: '1.5'
            }}>
              {bundle.description}
            </p>
          </div>

          {/* Pricing Details */}
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                Original Price
              </span>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-tertiary)',
                textDecoration: 'line-through'
              }}>
                ${bundle.originalPrice.toFixed(2)}/mo
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                Discounted Price
              </span>
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#22c55e'
              }}>
                ${bundle.discountedPrice.toFixed(2)}/mo
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <FiTag size={16} style={{ color: '#eab308' }} />
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#eab308'
              }}>
                Save {bundle.discount}% (${savings.toFixed(2)}/month)
              </span>
            </div>
          </div>

          {/* Included Services */}
          <div>
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Includes:
            </p>
            <ul style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {bundle.subscriptions.map((sub, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <FiCheck size={18} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)'
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
            Cancel
          </button>
          <button
            onClick={handleApply}
            style={{
              flex: 1,
              padding: '12px 24px',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
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
            Apply Bundle
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplyBundleModal
