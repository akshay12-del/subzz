import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { mockSubscriptions } from '../mockData/subscriptions'
import { useWallet } from './WalletContext'
import { useToast } from './ToastContext'

const SubscriptionContext = createContext(null)

export function SubscriptionProvider({ children }) {
    const { deductFunds } = useWallet()
    const { addToast } = useToast()

    const [subscriptions, setSubscriptions] = useState(() => {
        const stored = localStorage.getItem('subscriptions')
        return stored ? JSON.parse(stored) : mockSubscriptions
    })

    useEffect(() => {
        localStorage.setItem('subscriptions', JSON.stringify(subscriptions))
    }, [subscriptions])

    // Auto-billing check on mount
    useEffect(() => {
        const checkAutoBilling = () => {
            const today = new Date()
            let updated = false

            const newSubscriptions = subscriptions.map(sub => {
                if (sub.status === 'active' && sub.nextBilling) {
                    const billingDate = new Date(sub.nextBilling)

                    if (billingDate <= today) {
                        // Attempt payment
                        const success = deductFunds(sub.price, `Auto-renewal: ${sub.name}`)

                        if (success) {
                            updated = true
                            // Calculate next billing date
                            const nextDate = new Date(billingDate)
                            if (sub.billingCycle === 'monthly') {
                                nextDate.setMonth(nextDate.getMonth() + 1)
                            } else {
                                nextDate.setFullYear(nextDate.getFullYear() + 1)
                            }

                            addToast(`Renewed subscription: ${sub.name}`, 'success')

                            return {
                                ...sub,
                                nextBilling: nextDate.toISOString().split('T')[0] // Keep YYYY-MM-DD format
                            }
                        } else {
                            updated = true // State changed (status update)
                            addToast(`Payment failed for: ${sub.name}`, 'error')
                            return {
                                ...sub,
                                status: 'payment_failed'
                            }
                        }
                    }
                }
                return sub
            })

            if (updated) {
                setSubscriptions(newSubscriptions)
            }
        }

        // Small delay to ensure wallet is ready (though synchronous here)
        const timer = setTimeout(checkAutoBilling, 1000)
        return () => clearTimeout(timer)
    }, []) // Run once on mount

    const subscribe = useCallback((newSubscription) => {
        // Check if sufficient funds
        const success = deductFunds(newSubscription.price, `Subscription: ${newSubscription.name}`)

        if (!success) {
            addToast('Insufficient funds', 'error')
            return false
        }

        const today = new Date()
        const nextDate = new Date(today)
        if (newSubscription.billingCycle === 'monthly') {
            nextDate.setMonth(nextDate.getMonth() + 1)
        } else {
            nextDate.setFullYear(nextDate.getFullYear() + 1)
        }

        const subToAdd = {
            ...newSubscription,
            id: Date.now().toString(),
            status: 'active',
            startDate: today.toISOString().split('T')[0],
            nextBilling: nextDate.toISOString().split('T')[0]
        }

        setSubscriptions(prev => [subToAdd, ...prev])
        addToast(`Subscribed to ${newSubscription.name}`, 'success')
        return true
    }, [deductFunds, addToast])

    const pauseSubscription = useCallback((id) => {
        setSubscriptions(prev => prev.map(sub => {
            if (sub.id === id) {
                return { ...sub, status: 'paused', nextBilling: null }
            }
            return sub
        }))
        addToast('Subscription paused', 'info')
    }, [addToast])

    const resumeSubscription = useCallback((id) => {
        const sub = subscriptions.find(s => s.id === id)
        if (!sub) return

        // Deduct immediate payment for resuming? user request said "Deduct cost again"
        const success = deductFunds(sub.price, `Resumed: ${sub.name}`)
        if (!success) {
            addToast('Insufficient funds to resume', 'error')
            return
        }

        const today = new Date()
        const nextDate = new Date(today)
        if (sub.billingCycle === 'monthly') {
            nextDate.setMonth(nextDate.getMonth() + 1)
        } else {
            nextDate.setFullYear(nextDate.getFullYear() + 1)
        }

        setSubscriptions(prev => prev.map(s => {
            if (s.id === id) {
                return {
                    ...s,
                    status: 'active',
                    nextBilling: nextDate.toISOString().split('T')[0]
                }
            }
            return s
        }))
        addToast('Subscription resumed', 'success')
    }, [subscriptions, deductFunds, addToast])

    const cancelSubscription = useCallback((id) => {
        setSubscriptions(prev => prev.map(sub => {
            if (sub.id === id) {
                return { ...sub, status: 'cancelled', nextBilling: null }
            }
            return sub
        }))
        addToast('Subscription cancelled', 'info')
    }, [addToast])

    return (
        <SubscriptionContext.Provider value={{
            subscriptions,
            subscribe,
            pauseSubscription,
            resumeSubscription,
            cancelSubscription
        }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export function useSubscription() {
    const context = useContext(SubscriptionContext)
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider')
    }
    return context
}
