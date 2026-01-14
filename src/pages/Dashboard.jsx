import { useMemo, useState, useEffect } from 'react'
import { FiDollarSign, FiCreditCard, FiClock, FiTrendingUp } from 'react-icons/fi'
import { motion } from 'framer-motion'
import PageTransition from '../components/common/PageTransition'
import Skeleton from '../components/common/Skeleton'
import { useWallet } from '../context/WalletContext'
import { useSubscription } from '../context/SubscriptionContext'

function Dashboard() {
  const { transactions } = useWallet()
  const { subscriptions } = useSubscription()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading for effect
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const stats = useMemo(() => {
    const active = subscriptions.filter((sub) => sub.status === 'active')
    const previous = subscriptions.filter((sub) => sub.status === 'cancelled' || sub.status === 'inactive')

    // Calculate current month expense from actual transactions
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    // Sum of all debits in the current month
    const monthlyExpense = transactions
      .filter(t => t.type === 'debit')
      .filter(t => {
        const d = new Date(t.date)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
      })
      .reduce((sum, t) => sum + t.amount, 0)

    // Estimate recurring monthly liability
    const estimatedMonthlyLiability = active.reduce((sum, sub) => {
      const monthlyPrice = sub.billingCycle === 'yearly' ? sub.price / 12 : sub.price
      return sum + monthlyPrice
    }, 0)

    return {
      monthlyExpense,
      estimatedMonthlyLiability,
      activeCount: active.length,
      previousCount: previous.length,
      activeSubscriptions: active,
    }
  }, [subscriptions, transactions])

  // Process transactions for spending trend chart (Last 6 Months)
  const chartData = useMemo(() => {
    const months = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      months.push({
        name: d.toLocaleString('default', { month: 'short' }),
        month: d.getMonth(),
        year: d.getFullYear(),
        amount: 0
      })
    }

    transactions.forEach(t => {
      if (t.type === 'debit') {
        const d = new Date(t.date)
        const monthData = months.find(m => m.month === d.getMonth() && m.year === d.getFullYear())
        if (monthData) {
          monthData.amount += t.amount
        }
      }
    })

    return months.map(m => ({ month: m.name, amount: m.amount }))
  }, [transactions])

  const maxAmount = Math.max(...chartData.map((d) => d.amount))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <PageTransition>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Overview of your subscriptions
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Monthly Expense Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px var(--shadow)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiDollarSign size={24} style={{ color: 'var(--text-primary)' }} />
              </div>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                This Month
              </span>
            </div>
            {isLoading ? (
              <Skeleton width="120px" height={36} style={{ marginBottom: 4 }} />
            ) : (
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                ${stats.monthlyExpense.toFixed(2)}
              </h3>
            )}
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              Total spent this month
            </p>
          </motion.div>

          {/* Active Subscriptions Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px var(--shadow)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiCreditCard size={24} style={{ color: 'var(--text-primary)' }} />
              </div>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                Active
              </span>
            </div>
            {isLoading ? (
              <Skeleton width="60px" height={36} style={{ marginBottom: 4 }} />
            ) : (
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                {stats.activeCount}
              </h3>
            )}
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              Active subscriptions
            </p>
          </motion.div>

          {/* Previously Used Subscriptions Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px var(--shadow)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FiClock size={24} style={{ color: 'var(--text-primary)' }} />
              </div>
              <span style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                Previous
              </span>
            </div>
            {isLoading ? (
              <Skeleton width="60px" height={36} style={{ marginBottom: 4 }} />
            ) : (
              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                {stats.previousCount}
              </h3>
            )}
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)'
            }}>
              Previously used subscriptions
            </p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Spending Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px var(--shadow)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <FiTrendingUp size={20} style={{ color: 'var(--text-primary)' }} />
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                Monthly Spending Trend
              </h2>
            </div>

            {/* Chart Placeholder */}
            <div style={{
              height: '200px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: '8px',
              padding: '16px 0'
            }}>
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} width="40px" height={`${Math.random() * 80 + 20}%`} style={{ borderRadius: '4px 4px 0 0' }} />
                ))
              ) : (
                chartData.map((data, index) => {
                  const height = (data.amount / maxAmount) * 100
                  return (
                    <div key={index} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      flex: 1
                    }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        style={{
                          width: '100%',
                          backgroundColor: 'var(--text-primary)',
                          minHeight: '4px',
                          borderRadius: '4px 4px 0 0',
                          opacity: 0.8
                        }}
                      />
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        fontWeight: '500'
                      }}>
                        {data.month}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        color: 'var(--text-tertiary)'
                      }}>
                        ${data.amount.toFixed(0)}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </motion.div>

          {/* Category Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px var(--shadow)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '24px'
            }}>
              Category Distribution
            </h2>

            {/* Pie Chart Placeholder */}
            <div style={{
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {isLoading ? (
                <Skeleton width="150px" height="150px" borderRadius="50%" />
              ) : (
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: stats.activeCount > 0
                    ? `conic-gradient(
                        var(--text-primary) 0% 100%
                      )`
                    : 'var(--bg-tertiary)', // Fallback if no data
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  opacity: stats.activeCount > 0 ? 1 : 0.5
                }}>
                  {/* 
                      Note: Real dynamic conic-gradient generation is complex in inline styles. 
                      For a "Functional Simulation", a simple visual rep or just a list is better if we don't use a chart lib.
                      I'll enhance the legend to show counts instead.
                   */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    {stats.activeCount}
                  </div>
                </div>
              )}
            </div>

            {/* Legend - Dynamic Categories */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '16px'
            }}>
              {isLoading ? (
                Array(3).fill(0).map((_, i) => <Skeleton key={i} width="100%" height={20} />)
              ) : stats.activeCount === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No active subscriptions</p>
              ) : (
                Object.entries(stats.activeSubscriptions.reduce((acc, sub) => {
                  acc[sub.category] = (acc[sub.category] || 0) + 1
                  return acc
                }, {})).map(([category, count], index) => (
                  <div key={category} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        backgroundColor: 'var(--text-primary)',
                        opacity: 1 - (index * 0.15) // Visual distinction
                      }} />
                      <span>{category}</span>
                    </div>
                    <span>{count}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Active Subscriptions Preview */}
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '20px'
          }}>
            Active Subscriptions
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px'
            }}
          >
            {isLoading ? (
              Array(4).fill(0).map((_, i) => (
                <motion.div variants={itemVariants} key={i}>
                  <Skeleton height={180} style={{ borderRadius: '12px' }} />
                </motion.div>
              ))
            ) : (
              stats.activeSubscriptions.slice(0, 6).map((subscription) => (
                <motion.div
                  key={subscription.id}
                  variants={itemVariants}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px var(--shadow)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                  whileHover={{ y: -4, boxShadow: '0 4px 12px var(--shadow)' }}
                >
                  <div style={{
                    fontSize: '32px',
                    marginBottom: '12px'
                  }}>
                    {subscription.icon}
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    {subscription.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px'
                  }}>
                    {subscription.category}
                  </p>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)'
                  }}>
                    ${subscription.price.toFixed(2)}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 'normal',
                      color: 'var(--text-secondary)'
                    }}>
                      /{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </p>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Dashboard
