import { useState } from 'react'
import { mockBundles } from '../mockData/subscriptions'
import { FiTag, FiCheck } from 'react-icons/fi'
import ApplyBundleModal from '../components/modals/ApplyBundleModal'

function BundleOffers() {
  const [selectedBundle, setSelectedBundle] = useState(null)
  const [showApplyModal, setShowApplyModal] = useState(false)

  const handleApply = (bundle) => {
    setSelectedBundle(bundle)
    setShowApplyModal(true)
  }

  const handleConfirmApply = (bundle) => {
    alert(`Bundle "${bundle.name}" applied successfully! (Mock action)`)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          Bundle Offers
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '16px'
        }}>
          Save money with our subscription bundles
        </p>
      </div>

      {/* Bundle Cards Grid */}
      {mockBundles.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {mockBundles.map((bundle) => {
            const savings = bundle.originalPrice - bundle.discountedPrice
            return (
              <div
                key={bundle.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 2px 8px var(--shadow)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow)'
                }}
              >
                {/* Discount Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 1
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#eab308',
                    color: '#000000',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}>
                    <FiTag size={14} />
                    <span>{bundle.discount}% OFF</span>
                  </div>
                </div>

                {/* Bundle Info */}
                <div style={{ marginBottom: '20px', paddingRight: '100px' }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
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

                {/* Pricing Section */}
                <div style={{
                  padding: '16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)'
                    }}>
                      Original
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
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--text-primary)'
                    }}>
                      Now
                    </span>
                    <span style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: '#22c55e'
                    }}>
                      ${bundle.discountedPrice.toFixed(2)}/mo
                    </span>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    Save ${savings.toFixed(2)}/month
                  </div>
                </div>

                {/* Included Services */}
                <div style={{ marginBottom: '24px', flex: 1 }}>
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
                    gap: '8px',
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
                          gap: '8px',
                          fontSize: '14px',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <FiCheck size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => handleApply(bundle)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
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
            )
          })}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: '16px' }}>
            No bundle offers available at the moment
          </p>
        </div>
      )}

      {/* Apply Bundle Modal */}
      {showApplyModal && (
        <ApplyBundleModal
          bundle={selectedBundle}
          onClose={() => {
            setShowApplyModal(false)
            setSelectedBundle(null)
          }}
          onApply={handleConfirmApply}
        />
      )}
    </div>
  )
}

export default BundleOffers
