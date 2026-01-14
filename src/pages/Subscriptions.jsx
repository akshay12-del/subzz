import { useState, useEffect } from 'react'
import { FiPause, FiX, FiMoreVertical, FiPlay, FiRefreshCw, FiPlus } from 'react-icons/fi'
import SubscriptionDetailsModal from '../components/modals/SubscriptionDetailsModal'
import AddSubscriptionModal from '../components/modals/AddSubscriptionModal'
import ConfirmationModal from '../components/modals/ConfirmationModal'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import Skeleton from '../components/common/Skeleton'
import EmptyState from '../components/common/EmptyState'
import { useSubscription } from '../context/SubscriptionContext'
import { useToast } from '../context/ToastContext'

function Subscriptions() {
  const { subscriptions, subscribe, pauseSubscription, resumeSubscription, cancelSubscription } = useSubscription()
  const { addToast } = useToast()

  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Confirmation Modal State
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: () => { }
  })

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [filter, subscriptions])

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (filter === 'all') return true
    return sub.status === filter
  })

  const handleSubscribe = (subscriptionData) => {
    const success = subscribe(subscriptionData)
  }

  const handleViewDetails = (subscription) => {
    setSelectedSubscription(subscription)
    setShowDetailsModal(true)
  }

  const handlePause = (id, e) => {
    e.stopPropagation()
    setConfirmation({
      isOpen: true,
      title: 'Pause Subscription',
      message: 'Are you sure you want to pause this subscription? You can resume it anytime.',
      type: 'warning',
      confirmText: 'Pause',
      onConfirm: () => pauseSubscription(id)
    })
  }

  const handleResume = (id, e) => {
    e.stopPropagation()
    setConfirmation({
      isOpen: true,
      title: 'Resume Subscription',
      message: 'Resume this subscription? You will be charged immediately for the upcoming billing cycle.',
      type: 'success',
      confirmText: 'Resume & Pay',
      onConfirm: () => resumeSubscription(id)
    })
  }

  const handleCancel = (id, e) => {
    e.stopPropagation()
    setConfirmation({
      isOpen: true,
      title: 'Cancel Subscription',
      message: 'Are you sure you want to cancel this subscription? This action cannot be undone and you may lose access immediately.',
      type: 'danger',
      confirmText: 'Cancel Subscription',
      onConfirm: () => cancelSubscription(id)
    })
  }

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

  return (
    <PageTransition>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Subscriptions
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '16px'
            }}>
              Manage your active and inactive subscriptions
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <FiPlus size={20} />
            <span>New Subscription</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {['all', 'active', 'paused', 'cancelled'].map((status) => {
            const isActive = filter === status
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '-1px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          })}
        </div>

        {/* Subscriptions List */}
        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {Array(6).fill(0).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Skeleton height={280} style={{ borderRadius: '12px' }} />
              </motion.div>
            ))}
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            <AnimatePresence>
              {filteredSubscriptions.map((subscription) => {
                const statusColors = getStatusColor(subscription.status)
                return (
                  <motion.div
                    key={subscription.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      padding: '24px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 2px 8px var(--shadow)',
                      cursor: 'pointer'
                    }}
                    whileHover={{ y: -4, boxShadow: '0 4px 12px var(--shadow)' }}
                    onClick={() => handleViewDetails(subscription)}
                  >
                    {/* Header with Icon and Status */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        fontSize: '40px',
                        lineHeight: '1'
                      }}>
                        {subscription.icon}
                      </div>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: statusColors.bg,
                          color: statusColors.text
                        }}
                        className="status-badge"
                      >
                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                      </span>
                    </div>

                    {/* Subscription Info */}
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        marginBottom: '4px'
                      }}>
                        {subscription.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '12px'
                      }}>
                        {subscription.category} • {subscription.billingCycle}
                      </p>
                      <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)'
                      }}>
                        ${subscription.price.toFixed(2)}
                        <span style={{
                          fontSize: '14px',
                          fontWeight: 'normal',
                          color: 'var(--text-secondary)',
                          marginLeft: '4px'
                        }}>
                          /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </p>
                      {subscription.nextBilling && (
                        <p style={{
                          fontSize: '12px',
                          color: 'var(--text-tertiary)',
                          marginTop: '8px'
                        }}>
                          Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-color)'
                    }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {subscription.status === 'active' && (
                        <button
                          onClick={(e) => handlePause(subscription.id, e)}
                          style={{
                            flex: 1,
                            padding: '10px 16px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(234, 179, 8, 0.3)',
                            borderRadius: '8px',
                            color: '#eab308',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                          title="Pause Subscription"
                        >
                          <FiPause size={16} />
                          Pause
                        </button>
                      )}

                      {(subscription.status === 'paused' || subscription.status === 'cancelled' || subscription.status === 'payment_failed') && (
                        <button
                          onClick={(e) => handleResume(subscription.id, e)}
                          style={{
                            flex: 1,
                            padding: '10px 16px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '8px',
                            color: '#22c55e',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                          title={subscription.status === 'cancelled' ? 'Reactivate' : 'Resume'}
                        >
                          <FiPlay size={16} />
                          {subscription.status === 'cancelled' ? 'Reactivate' : 'Resume'}
                        </button>
                      )}

                      {subscription.status !== 'cancelled' && (
                        <button
                          onClick={(e) => handleCancel(subscription.id, e)}
                          style={{
                            flex: 1,
                            padding: '10px 16px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                          title="Cancel Subscription"
                        >
                          <FiX size={16} />
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewDetails(subscription)
                        }}
                        style={{
                          padding: '10px',
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
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = 'var(--text-secondary)'
                        }}
                        title="View Details"
                      >
                        <FiMoreVertical size={18} />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState
            title={`No ${filter === 'all' ? '' : filter} subscriptions`}
            description={`You don't have any ${filter === 'all' ? '' : filter} subscriptions at the moment.`}
          />
        )}

        {/* Subscription Details Modal */}
        {showDetailsModal && (
          <SubscriptionDetailsModal
            subscription={selectedSubscription}
            onClose={() => {
              setShowDetailsModal(false)
              setSelectedSubscription(null)
            }}
          />
        )}

        {/* Add Subscription Modal */}
        {showAddModal && (
          <AddSubscriptionModal
            onClose={() => setShowAddModal(false)}
            onSubscribe={handleSubscribe}
          />
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmation.isOpen}
          onClose={() => setConfirmation(prev => ({ ...prev, isOpen: false }))}
          onConfirm={confirmation.onConfirm}
          title={confirmation.title}
          message={confirmation.message}
          type={confirmation.type}
          confirmText={confirmation.confirmText}
        />
      </div>
    </PageTransition>
  )
}

export default Subscriptions
