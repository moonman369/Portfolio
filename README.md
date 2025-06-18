# 💻 Ayan Maiti | Developer Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
</div>

<div align="center">
  <h3><a href="https://moonman.in" target="_blank">✨ Live Demo: moonman.in</a></h3>
</div>

<p align="center">
  <img src="https://github.com/moonman369/Portfolio/blob/main/src/assets/portfolio-banner.png" alt="Portfolio Banner" width="100%"/>
</p>

## 📋 Overview

A modern, responsive developer portfolio website showcasing my skills, projects, and professional experience. The site features a sleek, dark-themed UI with Matrix-inspired interactive elements, dynamic GitHub and LeetCode stat integration, and a comprehensive display of my work in full-stack and blockchain development.

## ✨ Features

- **🎯 Interactive UI**: Sleek, responsive design with Matrix-inspired animations
- **📊 Live Stats Integration**: Real-time display of GitHub and LeetCode statistics
- **🚀 Project Showcase**: Comprehensive portfolio section featuring my latest work
- **📝 Skills & Experience**: Detailed breakdown of technical skills and competencies
- **📱 Fully Responsive**: Optimized for all device sizes with adaptive layouts
- **📬 Contact Form**: Integrated email contact functionality
- **📜 Resume/CV**: Direct download access to my latest CV

## 🛠️ Technologies Used

### Frontend

- React.js
- CSS3 with custom animations
- React Icons
- React Circular Progressbar
- React Notifications
- Email.js for contact form

### Backend/API Integration

- Node.js
- Express.js
- HTTP Proxy Middleware
- GitHub API (via Octokit)
- LeetCode API
- Geolocation API

### State Management & Utilities

- React Hooks
- React Cookies
- Axios for HTTP requests

## 🔍 Core Components

- **Header**: Main introduction with animated elements
- **About**: Personal background and quick statistics
- **Experience**: Detailed skills breakdown by category
- **Stats**: GitHub, LeetCode, and certification showcase
- **Portfolio**: Showcase of recent projects with live demos
- **Contact**: Multiple contact methods and form

## 🌐 API Integrations

- **GitHub API**: Fetches repositories, commits, PRs, and stars
- **LeetCode API**: Retrieves coding problem statistics
- **Geolocation API**: Detects user location for enhanced experience

## 🧩 Project Structure

```
/
├── public/               # Static files
├── src/                  # Source files
│   ├── assets/           # Images and static resources
│   ├── components/       # UI components
│   │   ├── about/        # About section
│   │   ├── contact/      # Contact section
│   │   ├── experience/   # Experience section
│   │   ├── footer/       # Footer component
│   │   ├── header/       # Header & hero section
│   │   ├── matrix-rain/  # Matrix animation effect
│   │   ├── nav/          # Navigation component
│   │   ├── portfolio/    # Portfolio showcase
│   │   ├── stats/        # GitHub & LeetCode stats
│   │   └── testimonials/ # Testimonials section
│   ├── App.jsx           # Main application component
│   ├── index.js          # Application entry point
│   ├── index.css         # Global styles
│   └── setupProxy.js     # API proxy configuration
└── package.json          # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/moonman369/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your API keys:

   ```
   REACT_APP_GITHUB_PAT=your_github_personal_access_token
   REACT_APP_USERNAME=your_github_username
   REACT_APP_API_KEY=your_geolocation_api_key
   REACT_APP_PORTFOLIO_API_HOSTNAME=your_api_hostname
   REACT_APP_PORTFOLIO_API_LEETCODE_ENDPOINT=your_leetcode_endpoint
   REACT_APP_PORTFOLIO_API_GITHUB_ENDPOINT=your_github_endpoint
   ```

4. Start the development server

   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About Me

I'm Ayan Maiti, a Software Engineer at Tata Consultancy Services with experience in full-stack web development and blockchain technologies. I specialize in React.js, Node.js, and Solidity development.

## 📬 Contact

- **Email**: [ayanofficial31012001@gmail.com](mailto:ayanofficial31012001@gmail.com)
- **GitHub**: [moonman369](https://github.com/moonman369)
- **LinkedIn**: [Ayan Maiti](https://www.linkedin.com/in/ayan-maiti-5b4332233/)
- **LeetCode**: [moonman369](https://leetcode.com/moonman369)

---

<div align="center">
  <p>Designed & Developed with ❤️ by Ayan Maiti</p>
  <p>© 2023-2025 All Rights Reserved</p>
</div>
