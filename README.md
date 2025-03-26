# Number Munchers Clone 🎮

A modern web-based remake of the classic educational game "Number Munchers". Practice your math skills while avoiding Troggles in this nostalgic yet contemporary take on the beloved classic.

## 🎯 Features

- 🧮 Multiple game modes (Multiples, Factors, Primes, Equations, Inequalities)
- 🎨 Modern, responsive design
- 🏆 Score tracking and leaderboards
- 🎵 Retro-inspired sound effects
- 📱 Cross-platform compatibility
- 🔒 User authentication with NextAuth.js
- 🎨 Beautiful UI components from shadcn/ui

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Frontend:**
  - [React 19](https://react.dev/)
  - [TailwindCSS 4](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/) components
- **Backend:**
  - [tRPC 11](https://trpc.io/) for type-safe APIs
  - [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL
  - [NextAuth.js](https://next-auth.js.org/) for authentication
- **Database:** PostgreSQL
- **Development:**
  - TypeScript
  - ESLint
  - Prettier
  - pnpm (package manager)

## 📥 Installation

### Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher
- PostgreSQL 15 or higher
- Docker or Podman (for local database)

### Local Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/number-munchers-clone.git
cd number-munchers-clone
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy the example environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your database and authentication credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
AUTH_SECRET="your-secret"
AUTH_DISCORD_ID="your-discord-id"
AUTH_DISCORD_SECRET="your-discord-secret"
```

5. Start the local database:

```bash
./start-database.sh
```

6. Initialize the database:

```bash
pnpm db:push
```

7. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🚀 Deployment

### General Deployment

1. Build the application:

```bash
pnpm build
```

2. Start the production server:

```bash
pnpm start
```

### Vercel Deployment

1. Install the [Vercel CLI](https://vercel.com/cli):

```bash
pnpm install -g vercel
```

2. Link your project:

```bash
vercel link
```

3. Deploy:

```bash
vercel deploy
```

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

## 🧪 Testing

Run the test suite:

```bash
pnpm test
```

## 📖 Documentation

Additional documentation can be found in the `/docs` directory, including:

- Game Rules and Mechanics
- API Documentation
- Component Library
- Database Schema

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Number Munchers game by MECC
- [T3 Stack](https://create.t3.gg/) for the project foundation
- All our contributors and supporters

## 📞 Support

For support, please open an issue in the GitHub repository.
