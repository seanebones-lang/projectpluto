# 90 Days ad Gloriam - ELCA AI-Enabled Spiritual Companion

**Organization:** Evangelical Lutheran Church in America (ELCA)  
**Status:** Phase 2 In Progress - AI-Enabled Features  
**Date:** October 27, 2025  
**Tech Stack:** React Native 0.82.1 + NestJS 11.0.0 + Prisma 6.0.0 + Grok-4 AI  
**Current Branch:** phase-2-community-features

## Project Overview

An AI-powered spiritual companion app for the ELCA, featuring Lutheran-contextualized AI guidance, 90-day spiritual formation journeys, real-time fellowship communities, and geo-localized service opportunities. Built with Grok-4 AI fine-tuned on Lutheran theology and modern architecture for production deployment.

## ELCA-Specific AI Features

- **Lutheran Theological AI**: Grok-4 trained on ELCA resources, Book of Concord, and Lutheran theology
- **Daily Lectionary Devotions**: AI-generated reflections on Revised Common Lectionary readings
- **Prayer Companion**: Voice-enabled Lutheran-style intercessory prayer guidance
- **AI Mentor Matching**: Intelligent pairing with ELCA spiritual directors based on journey stage
- **Service Opportunity Discovery**: Geo-localized ELCA World Hunger and Lutheran Social Services sites
- **Community Challenges**: Shared spiritual goals with AI-powered progress insights

## What's Complete

### Backend (NestJS)
- All 14 TypeScript modules and services coded
- JWT authentication system (module, service, controller, guard, strategy)
- Users management (module, service)
- Prisma database schema with all models (User, Path, Journal, Service, Waypoint, VolunteerNeed)
- Grok-4 AI integration with ethical guidelines
- WebSocket real-time gateway for Fellowship Circles
- Blockchain service (WalletConnect + Ethereum)
- Waypoints service with PostGIS geospatial support
- Prisma client generated
- All dependencies installed (700 packages)
- TypeScript configuration complete
- NestJS CLI configuration complete

### Mobile App (React Native/Expo)
- All 5 React Native components coded
- Daily Invocation screen with push notifications
- 90-stone Path Tracker with Reanimated animations
- Book of Days journaling with Realm offline sync
- Modular Paths System (Digital Monk, Spiritual Renewal, Service)
- Voice Interaction component for prayers
- app.json configured with Expo SDK 54
- Babel configuration complete
- App.js entry point created
- All dependencies installed (598 packages)

### Infrastructure
- TurboRepo monorepo structure established
- GitHub Actions CI/CD workflow configured
- AWS deployment scripts ready
- Workspace configuration complete

## Quick Start

### Backend
```bash
cd apps/backend
npm run start:dev
```

Backend will start on http://localhost:3000

### Mobile
```bash
cd apps/mobile
npm start
```

### Database Setup (First Time Only)
```bash
cd apps/backend

# Create .env file with:
# DATABASE_URL="postgresql://user:password@localhost:5432/90days"

npx prisma migrate dev
npx prisma generate
```

## Project Structure

```
90-days-ad-gloriam/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── src/
│   │   │   ├── auth/     # JWT authentication
│   │   │   ├── users/    # User management
│   │   │   ├── ai/       # Grok-4 integration
│   │   │   ├── blockchain/ # WalletConnect
│   │   │   ├── fellowship/ # WebSocket chat
│   │   │   └── waypoints/  # Geolocation
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── nest-cli.json
│   │
│   └── mobile/           # React Native app
│       ├── src/
│       │   ├── screens/
│       │   │   ├── DailyInvocationScreen.js
│       │   │   └── BookOfDaysScreen.js
│       │   └── components/
│       │       ├── PathTracker.js
│       │       ├── PathsSystem.js
│       │       └── VoiceInteraction.js
│       ├── app.json
│       ├── babel.config.js
│       ├── App.js
│       └── package.json
│
└── package.json          # Root workspace config
```

## Tech Stack

### Frontend
- React Native 0.82.1 (New Architecture enabled)
- Expo SDK ~54.0.20
- React Native Reanimated 4.x
- Realm 12.6.0 (offline sync)
- TanStack Query 5.90.5 + Zustand 5.0.8
- NativeWind 4.1.0 (Tailwind CSS)
- React Navigation 7.1.0

### Backend
- NestJS 11.0.0
- Prisma 6.0.0 (PostgreSQL with PostGIS)
- JWT + Passport authentication
- Socket.io for real-time features
- bcryptjs for password hashing
- Ethers.js + WalletConnect for blockchain

### Infrastructure
- PostgreSQL 18 with PostGIS 3.6.0
- AWS (Amplify, Lambda, QuickSight)
- GitHub Actions CI/CD

## Next Steps

1. Set up PostgreSQL database with PostGIS extension
2. Create environment variables (.env file)
3. Run Prisma migrations: npx prisma migrate dev
4. Start backend: cd apps/backend && npm run start:dev
5. Start mobile: cd apps/mobile && npm start
6. Add test data and begin integration testing

## Documentation

- BUILD_VERIFICATION.md - Complete build verification report
- SETUP_STATUS.md - Setup status and completion details
- .cursor/plans/90-days-ad-gloriam-*.plan.md - Full implementation plan

## Design

- Primary Color: Deep Violet (#4B0082)
- Accent Color: Gold (#FFD700)
- Accessibility: WCAG AA compliant

## Security

- JWT token authentication
- bcrypt password hashing
- Helmet security headers
- CORS protection
- Rate limiting with @nestjs/throttler
- Input validation with class-validator

## Features Implemented

- Daily Invocation with push notifications
- 90-stone progress tracker with animations
- Offline-first journaling with Realm
- AI-powered reflections (Grok-4 API)
- Real-time Fellowship Circles chat
- Geolocation-based volunteer waypoints
- Voice interaction for prayers
- Blockchain donation tracking
- Modular pilgrimage path system

## Contributing

This project is configured for development with Cursor AI and follows modern best practices for code quality, testing, and deployment.

## License

ISC

---

**Built using Cursor AI**  
**Last Updated:** October 27, 2025  
**Version:** 1.0.0