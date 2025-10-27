<!-- 62e8604d-44ac-42d3-83a0-3a78bbd7a94d 62ebe7a2-d205-42d9-8a64-b9877b47e84d -->
# 90 Days ad Gloriam App - Full Implementation Plan

## Project Architecture

**Tech Stack (Confirmed Oct 27, 2025):**

- Frontend: React Native 0.82.1 (New Architecture) with Expo SDK 54.0.20
- Backend: NestJS 11.1.6 with Prisma 6.18.0 ORM
- Database: PostgreSQL 18 with PostGIS 3.6.0
- AI: Grok-4 API via xAI ($0.20-0.40/M tokens tiered, 2M context)
- State: TanStack Query 5.90.5 + Zustand 5.0.8
- Styling: NativeWind 4.1.0 (Tailwind for React Native)
- Animations: React Native Reanimated 4.x (CSS transitions support)
- Infrastructure: AWS (Amplify, Lambda, QuickSight, WebSocket API Gateway)

## Phase 1: Core Pilgrimage Features (4 weeks)

### Week 1: Foundation & Setup

- Initialize TurboRepo monorepo with apps/mobile, apps/backend, packages/shared
- Configure Expo project with React Native 0.82 New Architecture
- Set up NestJS backend with Prisma schema for Users, Paths, Journals, Services
- Create PostgreSQL database with PostGIS extensions for geospatial data
- Design deep violet/gold UI theme with accessibility compliance
- Configure AWS Amplify for hosting and deployment

### Week 2: Core User Journey

- **Daily Invocation Screen**: Morning quotes/Psalms with Expo Notifications
- **90-Stone Path Tracker**: Luminous progress visualization with Reanimated 3.18.0
- **Book of Days**: Offline journaling with Expo FileSystem and Realm 12.6.0 sync
- **Basic AI Integration**: Grok-4 API for compassionate reflection generation
- **User Authentication**: JWT with expo-secure-store for token management

### Week 3: Path System Implementation

- **Paths of Pilgrimage**: Modular system for different spiritual journeys
- **Digital Monk Path**: Digital fasting timers with Expo Background Tasks
- **Spiritual Renewal Path**: Meditation and prayer tracking
- **Service & Action Path**: Service hour logging and verification
- **Path Progress Syncing**: Offline-first with background synchronization

### Week 4: Core Polish & Testing

- Implement offline functionality with Redux Persist 7.0.0
- Add haptic feedback and smooth animations
- Create comprehensive error handling and loading states
- Unit testing with Jest 30.0.0 and React Native Testing Library
- Performance optimization with Hermes engine and memory management

## Phase 2: Community & Geo Features (2-3 weeks)

### Week 5-6: Community Features

- **Fellowship Circles**: Real-time chat with Socket.io-client 4.8.0
- **Waypoints of Grace**: Geo-localized volunteer opportunities with PostGIS queries
- **Community Challenges**: Shared goals and progress tracking
- **Mentor Matching**: AI-powered pairing based on spiritual journey stage

### Week 7: Advanced Integrations

- **PWA Support**: Expo Web integration for desktop/tablet access
- **Wearable Integration**: Apple Health/Google Fit via Expo Sensors + HealthKit
- **Advanced Analytics**: AWS QuickSight dashboard for congregational insights
- **Enhanced AI**: Fine-tuned Grok-4 models on faith-specific datasets

## Phase 3: Advanced Features (2 weeks)

### Week 8: Next-Gen Features

- **Voice Mode**: Grok-3 Voice API integration with Expo AV 14.0.0
- **On-Device AI**: React Native Executorch 0.4.0 for privacy-focused reflections
- **AR Previews**: Virtual pilgrimage sites using React Native Vision Camera 4.5.0
- **Blockchain Integration**: WalletConnect 3.0.0 for transparent donation tracking

### Week 9: Final Polish & Deployment

- E2E testing with Detox 21.0.0
- Security hardening and penetration testing
- App Store optimization and compliance review
- Production deployment with CI/CD via GitHub Actions
- Comprehensive documentation and handover materials

## Technical Implementation Details

### Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  profile   Profile?
  paths     UserPath[]
  journals  Journal[]
  services  Service[]
}

model Path {
  id          String     @id @default(uuid())
  name        String
  description String
  stones      Int        @default(90)
  users       UserPath[]
}

model Waypoint {
  id       String @id @default(uuid())
  location Point  // PostGIS Point type
  needs    VolunteerNeed[]
}
```

### Key Components Architecture

- `PathTracker`: Animated progress with stone lighting effects
- `InvocationScreen`: Daily spiritual content with push notifications
- `JournalEditor`: Rich text editor with offline sync
- `FellowshipChat`: Real-time messaging with WebSocket fallback
- `WaypointMap`: Geographic volunteer opportunity discovery

### AI Integration Strategy

- **Ethical Engine**: Grok-4 fine-tuned on theological datasets
- **Privacy-First**: On-device sentiment analysis via Executorch
- **Bias Auditing**: NIST AI RMF 2.0 compliance checks
- **EU AI Act Compliance**: Transparency in AI recommendations

### Security & Privacy

- End-to-end encryption for journal entries using libsodium 1.0.20
- Biometric authentication via Expo Local Authentication 14.0.0
- GDPR/CCPA 2025 compliance with granular consent management
- Regular security audits and vulnerability assessments

## Success Metrics

- **Phase 1**: Core user journey functional with offline sync
- **Phase 2**: Community features active with real-time updates
- **Phase 3**: Advanced features deployed with <3s load times
- **Overall**: App Store approval, 4.5+ rating, 90% crash-free sessions

## Risk Mitigation

- **AI Accuracy**: Multiple fallback models and human oversight
- **Performance**: Aggressive memory management and optimization
- **Security**: Multi-layer encryption and security auditing
- **Timeline**: Agile sprints with weekly deliverables and buffer time

### To-dos

- [ ] Initialize TurboRepo monorepo with apps/mobile, apps/backend, packages/shared structure
- [ ] Set up Expo SDK 54 project with React Native 0.82 New Architecture enabled
- [ ] Initialize NestJS 11.1.7 backend with Prisma ORM and PostgreSQL with PostGIS
- [ ] Create Prisma schema for Users, Paths, Journals, Services, and geo-locations
- [ ] Build JWT authentication system with expo-secure-store integration
- [ ] Implement Daily Invocation screen with quotes/Psalms and push notifications
- [ ] Create 90-stone luminous path tracker with Reanimated animations
- [ ] Build Book of Days journaling with offline sync and Realm integration
- [ ] Connect Grok-4 API for AI-powered reflection generation with ethical guidelines
- [ ] Implement modular Paths of Pilgrimage system with Digital Monk, Spiritual Renewal, and Service paths
- [ ] Build Fellowship Circles real-time chat with Socket.io integration
- [ ] Create Waypoints of Grace geo-localized volunteer system with PostGIS queries
- [ ] Integrate Grok-3 Voice API for spoken prayers and interactions
- [ ] Add WalletConnect integration for transparent donation tracking
- [ ] Configure AWS infrastructure and deploy to production with CI/CD