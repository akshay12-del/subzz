import { useState } from 'react'
import { FiPlus, FiArrowDown, FiArrowUp, FiDollarSign } from 'react-icons/fi'
import AddFundsModal from '../components/modals/AddFundsModal'
import { useWallet } from '../context/WalletContext'
import { useToast } from '../context/ToastContext'
import { validateInput, transactionSchema } from '../utils/validation'

function Funds() {
  const { balance, transactions, addFunds, redeemFunds } = useWallet()
  const { addToast } = useToast()
  const [showAddFundsModal, setShowAddFundsModal] = useState(false)

  const handleAddFunds = (amount) => {
    // Validate amount
    const validation = validateInput(transactionSchema, { amount })
    if (!validation.success) {
      addToast(validation.error, 'error')
      return
    }

    const success = addFunds(amount)
    if (success) {
      addToast(`Added $${amount.toFixed(2)} to wallet`, 'success')
      setShowAddFundsModal(false)
    } else {
      addToast('Failed to add funds', 'error')
    }
  }

  const handleRedeem = () => {
    const amount = prompt('Enter amount to redeem:')
    if (amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0) {
      const redeemAmount = parseFloat(amount)

      // Validate redemption amount
      const validation = validateInput(transactionSchema, { amount: redeemAmount })
      if (!validation.success) {
        addToast(validation.error, 'error')
        return
      }

      const success = redeemFunds(redeemAmount)

      if (success) {
        addToast(`Redeemed $${redeemAmount.toFixed(2)} from wallet`, 'success')
      } else {
        if (redeemAmount > balance) {
          addToast('Insufficient balance', 'error')
        } else {
          addToast('Failed to redeem funds', 'error')
        }
      }
    } else if (amount) {
      addToast('Please enter a valid amount', 'error')
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
          Funds
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '16px'
        }}>
          Manage your wallet balance and transactions
        </p>
      </div>

      {/* Wallet Balance Card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--bg-tertiary) 100%)',
        padding: '32px',
        borderRadius: '16px',
        marginBottom: '32px',
        boxShadow: '0 4px 12px var(--shadow)',
        color: 'var(--bg-primary)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div>
            <p style={{
              fontSize: '14px',
              opacity: 0.8,
              marginBottom: '8px',
              color: 'var(--bg-primary)'
            }}>
              Wallet Balance
            </p>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'var(--bg-primary)',
              margin: 0
            }}>
              ${balance.toFixed(2)}
            </h2>
          </div>
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiDollarSign size={32} style={{ color: 'var(--bg-primary)' }} />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={() => setShowAddFundsModal(true)}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 20px',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
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
            <FiPlus size={20} />
            <span>Add Funds</span>
          </button>
          <button
            onClick={handleRedeem}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--bg-primary)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <FiArrowDown size={20} />
            <span>Redeem</span>
          </button>
        </div>
      </div>

      {/* Transaction History */}
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
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '48px 20px',
            color: 'var(--text-secondary)'
          }}>
            <FiDollarSign
              style={{
                margin: '0 auto 16px',
                color: 'var(--text-tertiary)',
                display: 'block'
              }}
              size={48}
            />
            <p style={{
              fontSize: '16px',
              color: 'var(--text-secondary)'
            }}>
              No transactions yet
            </p>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-tertiary)',
              marginTop: '8px'
            }}>
              Add funds to get started
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {transactions.map((transaction) => {
              const isCredit = transaction.type === 'credit'
              return (
                <div
                  key={transaction.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      padding: '10px',
                      borderRadius: '50%',
                      backgroundColor: isCredit
                        ? 'rgba(34, 197, 94, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isCredit ? (
                        <FiArrowUp
                          size={20}
                          style={{
                            color: isCredit ? '#22c55e' : '#ef4444'
                          }}
                        />
                      ) : (
                        <FiArrowDown
                          size={20}
                          style={{
                            color: isCredit ? '#22c55e' : '#ef4444'
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: 'var(--text-primary)',
                        marginBottom: '4px'
                      }}>
                        {transaction.description}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: 'var(--text-tertiary)'
                      }}>
                        {new Date(transaction.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: isCredit ? '#22c55e' : '#ef4444'
                  }}>
                    {isCredit ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <AddFundsModal
          onClose={() => setShowAddFundsModal(false)}
          onAdd={handleAddFunds}
        />
      )}
    </div>
  )
}

export default Funds
