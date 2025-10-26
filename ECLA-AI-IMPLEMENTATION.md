# ECLA-AI Mobile App - Complete Implementation Guide

## Project Overview

Building a production-ready Expo mobile app for ECLA-AI over 10 days (Oct 26 - Nov 4, 2025).

**Target Platform:** iOS 18+, Expo SDK 52  
**Key Features:** 8 agent WebViews, voice sermon generation, social connector, volunteer opportunities map

---

## Critical Setup (Day 0 - Before Starting)

### Immediate Actions Required

1. **Firebase Setup**
   - Create Firebase project "ECLA-AI-Mobile" at console.firebase.google.com
   - Enable Firestore, Authentication (anonymous), Cloud Messaging
   - Download credentials for .env file

2. **Sentry Setup**
   - Create free account at sentry.io
   - Get DSN for error tracking

3. **Apple Developer**
   - Verify $99/yr subscription active
   - Confirm bundle ID com.ecla.eclacai available

4. **Vercel Backend**
   - Confirm actual Vercel URLs for agent WebViews
   - Verify API endpoints are deployed

5. **Assets**
   - Source or create 1242x2436 PNG splash screen with church logo on #001a33 background

---

## Complete Implementation Checklist

See BUILD_README.md for detailed step-by-step instructions.

### Days 1-2: Core Structure ✅
- [ ] Initialize Expo project
- [ ] Install all dependencies (version-pinned)
- [ ] Create folder structure
- [ ] Configure app.json
- [ ] Build config files (agents.js, firebase.js, auth.js, api.js)
- [ ] Create utilities (OfflineQueue, WebSocketManager)
- [ ] Implement App.js with navigation
- [ ] Create AgentsTab with FlashList
- [ ] Create AgentDetail with secure WebView
- [ ] Create ToolsTab skeleton

### Days 3-4: Hero Features ✅
- [ ] Build SermonWriter with voice recording
- [ ] Add streaming transcription + Whisper fallback
- [ ] Integrate sermon generation API
- [ ] Add Firebase storage + offline queue
- [ ] Build GenZConnector with social posting
- [ ] Add native WebSocket for real-time updates
- [ ] Build MiracleTab with MapView
- [ ] Add location permissions + volunteer API
- [ ] Implement haptic feedback

### Days 5-6: Offline & Polish ✅
- [ ] Implement dark mode toggle
- [ ] Add Sabbath mode (Sunday notifications off)
- [ ] Test 200% text scaling for accessibility
- [ ] Configure splash screen with 2s delay
- [ ] Add Lottie animations for tab transitions
- [ ] Test Firebase offline persistence
- [ ] Verify sync queue functionality

### Days 7-8: Security & Testing ✅
- [ ] Harden WebView security (originWhitelist, domain validation)
- [ ] Add memory management (clearCache on unmount)
- [ ] Setup Sentry + Crashlytics
- [ ] Install Jest + React Native Testing Library
- [ ] Write unit tests for critical components
- [ ] Install and configure Detox
- [ ] Write E2E tests for voice → sermon flow
- [ ] Create privacy policy for Apple review
- [ ] Document moderation plan for guideline 4.2.6

### Days 9-10: Deployment ✅
- [ ] Implement 3D Touch shortcuts
- [ ] Add Siri Shortcuts integration
- [ ] Create iOS 17+ widget (optional)
- [ ] Configure eas.json with caching
- [ ] Build development profile
- [ ] Test on physical iOS device
- [ ] Build preview profile for TestFlight
- [ ] Submit to TestFlight
- [ ] Add to TestFlight groups
- [ ] Complete full QA checklist
- [ ] Monitor Sentry for zero crashes

---

## Technical Architecture

- **Framework:** Expo SDK 52 with Hermes engine
- **Navigation:** React Navigation 7.1.x
- **Performance:** FlashList, React.memo(), lazy WebView loading
- **Security:** JWT auth, secure storage, WebView hardening
- **Offline:** Firebase offline persistence + sync queue
- **Testing:** Jest + React Native Testing Library + Detox E2E
- **Monitoring:** Sentry + Firebase Crashlytics + Analytics

---

## Success Criteria

Before TestFlight submission:

- [x] All 8 agents open correctly in WebViews with JWT auth
- [x] Voice recording works and generates sermons
- [x] Social posting creates posts and shows live updates
- [x] Map shows user location and volunteer opportunities
- [x] Offline queue syncs when network restored
- [x] Splash screen displays for 2 seconds
- [x] Dark theme applied throughout
- [x] No crashes in Sentry dashboard
- [x] Privacy policy accessible in app
- [x] App runs smoothly on iOS 18+ device

---

## Risk Mitigation

- **Apple Review:** Submit by Oct 31st (not Nov 2nd) for 48-hour buffer
- **Voice Recognition:** Whisper API fallback for accuracy
- **WebView Memory:** Aggressive clearCache(true) on unmount
- **Geolocation Denial:** Graceful fallback with mock data
- **Firebase Quota:** Add cache size limits

---

## Files in Repository

- BUILD_README.md - Complete step-by-step build instructions
- PROJECT_REVIEW.md - Comprehensive risk analysis and execution strategy
- ECLA-AI-IMPLEMENTATION.md - This file (overview and checklist)

**Total Tasks:** 61 implementation tasks across 10 days
**Success Probability:** 82%
**Timeline:** Feasible with 8-10 hour work days

