# Anime Vanguards Stat Calculator

A modern, interactive web application for calculating unit statistics in Anime Vanguards. Built with React and featuring a beautiful gaming-inspired UI.

## Features

- **Real-time Stat Calculation**: Calculate damage, range, SPA, and placement costs with various upgrades and traits
- **Unit Management**: Browse, search, and manage unit database with admin panel
- **Interactive UI**: Gaming-themed interface with animations and responsive design
- **Trait System**: Apply various traits and see their effects on unit statistics
- **Tier System**: View units organized by meta tiers and performance levels

## Live Demo

Visit the live application: [https://KennelyRay.github.io/AV-Stat-Calc](https://KennelyRay.github.io/AV-Stat-Calc)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KennelyRay/AV-Stat-Calc.git
cd AV-Stat-Calc
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`.

## Deployment to GitHub Pages


1. Install gh-pages dependency (already included):
```bash
npm install --save-dev gh-pages
```

2. Update the homepage in package.json with your repository URL

3. Deploy:
```bash
npm run deploy
```

## Admin Panel

Access the admin panel to manage units:
- Username: `Admin`
- Password: `000000`

Features:
- Add/Edit/Delete units
- Import/Export unit data
- Manage unit statistics and evolution requirements
- Upload unit images

## Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/          # React context providers
├── pages/             # Main application pages
├── index.css          # Global styles and animations
└── App.js             # Main application component
```

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **LocalStorage** - Data persistence

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Anime Vanguards game for inspiration
- Gaming community for feedback and suggestions 