import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
    // Initialize state from localStorage or default
    const [balance, setBalance] = useState(() => {
        const stored = localStorage.getItem('walletBalance')
        return stored ? parseFloat(stored) : 0
    })

    const [transactions, setTransactions] = useState(() => {
        const stored = localStorage.getItem('transactions')
        return stored ? JSON.parse(stored) : []
    })

    // Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('walletBalance', balance.toString())
    }, [balance])

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }, [transactions])

    // Actions
    const addFunds = useCallback((amount) => {
        if (amount <= 0) return false

        setBalance(prev => prev + amount)
        setTransactions(prev => [{
            id: Date.now().toString(),
            type: 'credit',
            amount: parseFloat(amount),
            description: 'Funds added to wallet',
            date: new Date().toISOString()
        }, ...prev])
        return true
    }, [])

    const redeemFunds = useCallback((amount) => {
        if (amount <= 0) return false
        if (amount > balance) return false

        setBalance(prev => prev - amount)
        setTransactions(prev => [{
            id: Date.now().toString(),
            type: 'debit',
            amount: parseFloat(amount),
            description: 'Funds redeemed from wallet',
            date: new Date().toISOString()
        }, ...prev])
        return true
    }, [balance])

    // Internal method for subscription deductions
    const deductFunds = useCallback((amount, description) => {
        if (amount > balance) return false

        setBalance(prev => prev - amount)
        setTransactions(prev => [{
            id: Date.now().toString(),
            type: 'debit',
            amount: parseFloat(amount),
            description,
            date: new Date().toISOString()
        }, ...prev])
        return true
    }, [balance])

    return (
        <WalletContext.Provider value={{
            balance,
            transactions,
            addFunds,
            redeemFunds,
            deductFunds
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet() {
    const context = useContext(WalletContext)
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider')
    }
    return context
}
