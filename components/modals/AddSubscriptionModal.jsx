import { useState } from 'react'
import { FiX, FiSearch, FiCheck } from 'react-icons/fi'

const availableServices = [
    { id: 'netflix', name: 'Netflix', price: 15.99, icon: '🎬', category: 'Entertainment' },
    { id: 'spotify', name: 'Spotify Premium', price: 9.99, icon: '🎵', category: 'Music' },
    { id: 'adobe', name: 'Adobe Creative Cloud', price: 52.99, icon: '🎨', category: 'Productivity' },
    { id: 'prime', name: 'Amazon Prime', price: 14.99, icon: '📦', category: 'Shopping' },
    { id: 'disney', name: 'Disney+', price: 10.99, icon: '🏰', category: 'Entertainment' },
    { id: 'm365', name: 'Microsoft 365', price: 6.99, icon: '💼', category: 'Productivity' },
    { id: 'hulu', name: 'Hulu', price: 7.99, icon: '📺', category: 'Entertainment' },
    { id: 'hbo', name: 'HBO Max', price: 15.99, icon: '🎬', category: 'Entertainment' },
    { id: 'apple', name: 'Apple Music', price: 10.99, icon: '🎵', category: 'Music' },
    { id: 'notion', name: 'Notion', price: 8.00, icon: '📝', category: 'Productivity' },
]

function AddSubscriptionModal({ onClose, onSubscribe }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedService, setSelectedService] = useState(null)
    const [billingCycle, setBillingCycle] = useState('monthly')

    const filteredServices = availableServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubscribe = () => {
        if (!selectedService) return

        onSubscribe({
            name: selectedService.name,
            price: selectedService.price,
            category: selectedService.category,
            icon: selectedService.icon,
            billingCycle: billingCycle
        })
        onClose()
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
                    maxWidth: '600px',
                    width: '100%',
                    padding: '24px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
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
                        New Subscription
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
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
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
                        placeholder="Search popular services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            paddingLeft: '40px',
                            paddingRight: '16px',
                            paddingTop: '12px',
                            paddingBottom: '12px',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                    />
                </div>

                {/* List */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: '200px',
                    maxHeight: '300px',
                    marginBottom: '24px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)'
                }}>
                    {filteredServices.map(service => (
                        <div
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 16px',
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--border-color)',
                                backgroundColor: selectedService?.id === service.id ? 'var(--bg-primary)' : 'transparent',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <div style={{
                                fontSize: '24px',
                                marginRight: '16px',
                                width: '32px',
                                textAlign: 'center'
                            }}>
                                {service.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontWeight: '600',
                                    color: 'var(--text-primary)',
                                    marginBottom: '2px'
                                }}>
                                    {service.name}
                                </p>
                                <p style={{
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {service.category}
                                </p>
                            </div>
                            <div style={{
                                textAlign: 'right'
                            }}>
                                <p style={{
                                    fontWeight: 'bold',
                                    color: 'var(--text-primary)'
                                }}>
                                    ${service.price}
                                </p>
                                {selectedService?.id === service.id && (
                                    <FiCheck size={16} style={{ color: '#22c55e', marginTop: '4px' }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Billing Cycle */}
                {selectedService && (
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'var(--text-secondary)',
                            marginBottom: '8px'
                        }}>
                            Billing Cycle
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: `1px solid ${billingCycle === 'monthly' ? 'var(--text-primary)' : 'var(--border-color)'}`,
                                    backgroundColor: billingCycle === 'monthly' ? 'var(--text-primary)' : 'transparent',
                                    color: billingCycle === 'monthly' ? 'var(--bg-primary)' : 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '6px',
                                    border: `1px solid ${billingCycle === 'yearly' ? 'var(--text-primary)' : 'var(--border-color)'}`,
                                    backgroundColor: billingCycle === 'yearly' ? 'var(--text-primary)' : 'transparent',
                                    color: billingCycle === 'yearly' ? 'var(--bg-primary)' : 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleSubscribe}
                    disabled={!selectedService}
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: selectedService ? 'var(--text-primary)' : 'var(--border-color)',
                        color: 'var(--bg-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: selectedService ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        opacity: selectedService ? 1 : 0.7
                    }}
                >
                    Subscribe {selectedService ? `($${selectedService.price}/${billingCycle === 'monthly' ? 'mo' : 'yr'})` : ''}
                </button>
            </div>
        </div>
    )
}

export default AddSubscriptionModal
