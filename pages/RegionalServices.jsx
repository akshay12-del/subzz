import { useState } from 'react'
import { mockRegionalServices } from '../mockData/subscriptions'
import { FiExternalLink, FiSearch, FiSmartphone, FiTv } from 'react-icons/fi'

function RegionalServices() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const filteredServices = mockRegionalServices.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || service.type === selectedType
    return matchesSearch && matchesType
  })

  const handleSubscribe = (serviceId, planName) => {
    alert(`Subscribe functionality for ${serviceId} - ${planName} is a mock action`)
  }

  const handleExplore = (serviceId) => {
    alert(`Explore functionality for ${serviceId} is a mock action`)
  }

  const handleRecharge = (serviceId, plan) => {
    alert(`Recharge functionality for ${serviceId} - ${plan.name} (₹${plan.price}) is a mock action`)
  }

  const getTypeColor = (type) => {
    if (type === 'mobile') {
      return {
        bg: 'rgba(59, 130, 246, 0.1)',
        text: '#3b82f6',
        darkBg: 'rgba(59, 130, 246, 0.2)',
        darkText: '#60a5fa'
      }
    } else {
      return {
        bg: 'rgba(168, 85, 247, 0.1)',
        text: '#a855f7',
        darkBg: 'rgba(168, 85, 247, 0.2)',
        darkText: '#c084fc'
      }
    }
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
          Regional Services
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '16px'
        }}>
          Mobile recharge and regional OTT platforms
        </p>
      </div>

      {/* Search and Filter */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px'
      }}
      className="search-filter-container"
      >
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          flex: 1
        }}>
          <FiSearch style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            fontSize: '20px'
          }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            style={{
              width: '100%',
              paddingLeft: '40px',
              paddingRight: '16px',
              paddingTop: '12px',
              paddingBottom: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--text-primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {['all', 'mobile', 'ott'].map((type) => {
            const isActive = selectedType === type
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isActive ? 'var(--text-primary)' : 'var(--bg-secondary)',
                  color: isActive ? 'var(--bg-primary)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'var(--bg-tertiary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'var(--bg-secondary)'
                  }
                }}
              >
                {type === 'mobile' && <FiSmartphone size={16} />}
                {type === 'ott' && <FiTv size={16} />}
                {type === 'all' ? 'All' : type === 'mobile' ? 'Mobile' : 'OTT'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {filteredServices.map((service) => {
            const typeColors = getTypeColor(service.type)
            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 2px 8px var(--shadow)',
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
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '40px',
                    lineHeight: '1'
                  }}>
                    {service.icon}
                  </div>
                  <span
                    style={{
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: typeColors.bg,
                      color: typeColors.text
                    }}
                    className="service-type-badge"
                  >
                    {service.type === 'mobile' ? 'Mobile' : 'OTT'}
                  </span>
                </div>

                {/* Service Name */}
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '20px'
                }}>
                  {service.name}
                </h3>

                {/* Plans */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '24px',
                  flex: 1
                }}>
                  {service.plans.map((plan, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: 'var(--text-primary)',
                          marginBottom: '4px'
                        }}>
                          {plan.name}
                        </p>
                        {plan.validity && (
                          <p style={{
                            fontSize: '12px',
                            color: 'var(--text-tertiary)'
                          }}>
                            {plan.validity}
                          </p>
                        )}
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                      }}>
                        <p style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: 'var(--text-primary)'
                        }}>
                          ₹{plan.price}
                        </p>
                        {service.type === 'mobile' && (
                          <button
                            onClick={() => handleRecharge(service.id, plan)}
                            style={{
                              marginTop: '6px',
                              padding: '4px 12px',
                              fontSize: '11px',
                              backgroundColor: 'var(--text-primary)',
                              color: 'var(--bg-primary)',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: '500',
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                          >
                            Recharge
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <button
                    onClick={() => handleSubscribe(service.id, 'service')}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
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
                    {service.type === 'mobile' ? 'Recharge' : 'Subscribe'}
                  </button>
                  <button
                    onClick={() => handleExplore(service.id)}
                    style={{
                      padding: '12px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--bg-tertiary)'
                      e.target.style.color = 'var(--text-primary)'
                      e.target.style.borderColor = 'var(--text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = 'var(--text-secondary)'
                      e.target.style.borderColor = 'var(--border-color)'
                    }}
                    title="Explore"
                  >
                    <FiExternalLink size={18} />
                  </button>
                </div>
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
            No services found matching your criteria
          </p>
        </div>
      )}
    </div>
  )
}

export default RegionalServices
