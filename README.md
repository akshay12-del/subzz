# Subscription Management Web App

A modern, mobile-first subscription management web application built with React.js, featuring a clean black & white design system with dark mode support.

## Features

- 🔐 **Authentication**: Login and Signup pages with mock authentication
- 📊 **Dashboard**: Overview of subscription expenses, active subscriptions, and spending trends
- 💳 **Subscriptions**: Manage active, paused, and cancelled subscriptions
- 🌍 **Regional Services**: Mobile recharge and regional OTT platform subscriptions
- 💰 **Funds**: Wallet balance management with transaction history
- 📦 **Bundle Offers**: Subscription bundles with discount offers
- ⚙️ **Settings**: Theme customization (Light/Dark/System) and font size scaling
- 📱 **Mobile-First**: Responsive design optimized for mobile devices

## Tech Stack

- **React.js** 18.2.0
- **React Router** 6.20.0
- **Tailwind CSS** 3.3.6
- **React Icons** 4.12.0
- **Vite** 5.0.8

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── modals/         # Modal components
│   ├── Layout.jsx      # Main layout wrapper
│   └── Sidebar.jsx     # Navigation sidebar
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── FontScaleContext.jsx
├── mockData/           # Mock data for subscriptions
│   └── subscriptions.js
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Subscriptions.jsx
│   ├── RegionalServices.jsx
│   ├── Funds.jsx
│   ├── BundleOffers.jsx
│   └── Settings.jsx
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Features in Detail

### Authentication
- Mock authentication system using localStorage
- Login and signup pages with form validation
- Protected routes requiring authentication

### Dashboard
- Monthly subscription expense calculation
- Active subscriptions count
- Previously used subscriptions count
- Visual subscription cards
- Chart placeholder for spending trends

### Subscriptions Management
- View all subscriptions (active, paused, cancelled)
- Filter by status
- Pause and cancel functionality (mock)
- Subscription details modal

### Regional Services
- Mobile recharge options (Airtel, Jio, Vodafone)
- Regional OTT platforms
- Search and filter functionality
- Subscribe and explore actions

### Funds Management
- Wallet balance display
- Add funds with preset amounts
- Redeem credits
- Transaction history with credit/debit tracking
- LocalStorage persistence

### Bundle Offers
- View available subscription bundles
- Discount percentage display
- Bundle details and included services
- Apply bundle functionality (mock)

### Settings
- Theme selection: Light, Dark, or System
- Font size scaling (50% - 200%)
- Change password modal
- Delete account confirmation
- All preferences persisted in localStorage

## Design System

- **Color Palette**: Black & White with subtle gradients
- **Typography**: Inter font family
- **Dark Mode**: Full support with system preference detection
- **Animations**: Smooth transitions and fade-in effects
- **Responsive**: Mobile-first approach with desktop support

## Mock Data

The app uses mock data stored in `src/mockData/subscriptions.js`. All actions (subscribe, pause, cancel, etc.) are mock implementations that display alerts. In a production environment, these would connect to real backend APIs.

## LocalStorage Persistence

The following data is persisted in localStorage:
- User authentication state
- Theme preference
- Font scale preference
- Wallet balance
- Transaction history

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.

