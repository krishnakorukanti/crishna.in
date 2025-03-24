# crishna.in

Personal website and portfolio built with Next.js 13.5.

## Tech Stack

- **Framework**: [Next.js 13.5](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [ContentLayer](https://contentlayer.dev/)
- **Deployment**: [Vercel](https://vercel.com)
- **Analytics**: Vercel Analytics

## Recent Updates

The project has been updated to use compatible versions of all dependencies:

- Next.js set to version 13.5.8 for ContentLayer compatibility
- Deprecated packages have been removed:
  - `@next/font` replaced with built-in `next/font`
  - `@tailwindcss/line-clamp` removed (now built into Tailwind CSS)
  - `rome` replaced with ESLint and Prettier
- All dependencies updated to their latest compatible versions

## Note on Next.js Version

This project currently uses Next.js 13.5.8 instead of Next.js 15+ due to compatibility requirements with ContentLayer. We'll upgrade to Next.js 15+ once ContentLayer adds support for it.

## Running Locally

```bash
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

## Formatting and Linting

```bash
# Format and lint code
npm run fmt
# or
pnpm fmt
# or
yarn fmt
```

## Building for Production

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

## Environment Variables

Create a `.env.local` file similar to `.env.example` with the required environment variables. 