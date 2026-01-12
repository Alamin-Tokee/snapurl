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

```

## Running with Docker (Recommended for Production/Testing)


```bash

# 1. Clone project (if not done)
git clone https://gitlab.waltonbd.com/whiplc-com-ict/soft-dev/inner/mfg/snapurl.git
cd snapurl

# 2. Copy and configure environment variables
touch .env

# Important: Use service name 'db' in DATABASE_URL
# Pase this content inside the environment variable file
DATABASE_URL="mysql://root:your_secure_password@db:3306/snapurl"
PORT=3000
BASE_URL=http://localhost:3000           # change to your domain in production

#build and run the container 
docker compose up -d --build

#Check error and health abouth contianer and application 
docker compose logs -f app

#If need to build again the conatainer 
#Stop the container 
docker stop CONTAINER_ID

# Remove the container 
docker rm CONTAINER_ID

#Then again build the container
