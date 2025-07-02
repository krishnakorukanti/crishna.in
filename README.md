# crishna.in - Portfolio & Personal Website

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13.5.8-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)](https://github.com/krishnakorukanti/crishna.in/blob/main/CHANGELOG.md)

A modern, responsive portfolio website and blog for Crishna Korukanti showcasing projects, skills, and professional experience.

![Portfolio Preview](public/og-image.png)

## ✨ Features

- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Interactive Terminal**: AI-powered assistant to help visitors explore the portfolio
- **Project Showcase**: Dynamic project cards and detailed project pages
- **SEO Optimized**: Meta tags, JSON-LD structured data, and sitemap generation
- **Analytics**: Built-in Vercel Analytics for visitor tracking
- **Content Management**: Markdown-based content using ContentLayer
- **Performance Optimized**: Core Web Vitals metrics tracking and optimization

## 🚀 Tech Stack

- **Framework**: [Next.js 15.3](https://nextjs.org/) - Latest stable version
- **Frontend**: [React 19.1](https://react.dev/) - Latest with enhanced performance
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/) - Latest major version
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 3D scenes and animations
- **Content**: [ContentLayer](https://contentlayer.dev/) - Markdown-based content management
- **Animations**: [Framer Motion 12.x](https://www.framer.com/motion/) - Smooth interactions
- **Deployment**: [Vercel](https://vercel.com) - Optimized hosting
- **Analytics**: Vercel Analytics - Performance tracking
- **AI Features**: OpenAI API integration - Intelligent chat assistant
- **Data Storage**: Upstash Redis - Fast data caching

## 📦 Project Structure

```
├── app/                     # Next.js App Router
│   ├── api/                 # API endpoints
│   ├── components/          # React components
│   ├── projects/            # Project pages
│   └── sections/            # Homepage sections
├── content/                 # ContentLayer content
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 📝 Recent Updates

The project has been updated to use compatible versions of all dependencies:

- Next.js set to version 13.5.8 for ContentLayer compatibility
- Deprecated packages have been removed:
  - `@next/font` replaced with built-in `next/font`
  - `@tailwindcss/line-clamp` removed (now built into Tailwind CSS)
  - `rome` replaced with ESLint and Prettier
- All dependencies updated to their latest compatible versions

## 🚀 Latest Technology Stack

This project has been successfully upgraded to the latest versions:
- **Next.js 15.3.4** - Latest stable version with ContentLayer support
- **React 19.1.0** - Latest version with improved performance
- **Tailwind CSS 4.x** - Latest major version with enhanced features
- **React Three Fiber** - For stunning 3D visual effects

## 🛠️ Running Locally

```bash
# Clone the repository
git clone https://github.com/krishnakorukanti/crishna.in.git
cd crishna.in

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Run the development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧹 Formatting and Linting

```bash
# Format and lint code
npm run fmt
# or
pnpm fmt
# or
yarn fmt
```

## 🏗️ Building for Production

```bash
# Build for production
npm run build
# or
pnpm build
# or
yarn build

# Start the production server
npm run start
# or
pnpm start
# or
yarn start
```

## 🔑 Environment Variables

Create a `.env.local` file similar to `.env.example` with the required environment variables:

```
# Redis for data storage
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# OpenAI API for AI features
OPENAI_API_KEY=your_openai_api_key

# Optional: GitHub token for private contributions
# NEVER commit this token to the repository
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
```

## 🔒 Security

This project takes security seriously. If you discover a security vulnerability, please follow the guidelines in [SECURITY.md](SECURITY.md).

Key security features:
- All API keys and tokens are stored in environment variables
- Client-side exposure of tokens is minimized
- Regular dependency updates via Dependabot
- Security scanning in CI pipeline

## 📊 Versioning

This project follows [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/krishnakorukanti/crishna.in/tags).

For a detailed changelog, see the [CHANGELOG.md](CHANGELOG.md) file.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 