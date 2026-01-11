# 🔗 SnapURL - URL Shortener


<!-- ![Project Banner](https://via.placeholder.com/1200x400.png?text=Your+Awesome+Project+Name) -->
<!-- You can replace with real project screenshot/banner later -->

## Tech Stack

- **Runtime**: Node.js 20.19.6
- **Framework**: Express.js
- **ORM/Database**: Prisma 6.1.0 + MySQL
- **Template Engine**: EJS
- **Language**: JavaScript (ESM)

## Features (example – modify according to your project)

- User authentication (register/login/logout)
- Functional operations for shorturl management
- Prisma migrations & seeding
- Environment variables management
- Basic layout with EJS template engine

## Prerequisites

- Node.js 20.19.6
- MySQL 8.0+ (local / docker / cloud)
- Prisma 6.1.0
- npm / pnpm / yarn (pnpm recommended)

## Quick Start (Recommended Way)

```bash
# 1. Clone the repository
git clone https://gitlab.waltonbd.com/whiplc-com-ict/soft-dev/inner/mfg/snapurl.git
cd snapurl

# 2. Install dependencies (using pnpm - faster & cleaner)

npm install

# 3. Copy example environment file
cp .env.example .env

# 4. Edit .env file (VERY IMPORTANT!)
-------------------------------
   DATABASE_URL="mysql://root:your_password@localhost:3306/your_database_name"
   PORT=3000
   BASE_URL=http://localhost:3000 # This url will expose as a shorturl, so carefully check it. 
   NODE_ENV=development
   # Optional: JWT_SECRET=your-super-secret-key-32chars+
-------------------------------

# 5. Create database & run migrations + seed (one-liner)
#pnpm db:setup

# or step by step:
npm prisma db push     # Fast sync (no migration files)
# OR full migration flow:
npm prisma migrate --name init # Recommended process for this project
#seed for dummy data
#pnpm prisma db seed

# 6. Start development server
npm run start

