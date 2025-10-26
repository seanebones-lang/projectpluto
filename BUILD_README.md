# ECLA-AI Mobile App - Cursor AI Agent Instructions

You are building a production-ready Expo mobile app for ECLA-AI. Follow these instructions sequentially to complete the project in 10 days (Oct 26 - Nov 4, 2025).

## Initial Setup (Day 1 Morning)

### 1. Project Initialization

```bash
npx create-expo-app@latest ecla-ai --template blank
cd ecla-ai
```

### 2. Configure Package Management

Create `.npmrc` file:
```
save-exact=true
```

### 3. Install Core Dependencies

```bash
npx expo install @react-navigation/native@7.1.0 @react-navigation/bottom-tabs@7.1.0 @react-navigation/stack@7.1.0 react-native-webview@13.10.5 axios@1.7.7 expo-secure-store@13.0.2 react-native-gesture-handler@2.18.1 @shopify/flash-list@1.7.1 firebase@10.15.0 expo-constants@16.0.2 expo-av@14.0.7 expo-location@17.0.1 react-native-maps@1.15.0 @react-native-voice/voice@1.10.0 @react-native-picker/picker@2.8.0 expo-splash-screen@0.28.0 lottie-react-native@7.0.0 expo-system-ui@3.0.7 @sentry/react-native@8.0.0 expo-sentry@13.0.0
```

### 4. Create Project Structure

```
src/
├── components/
│   ├── AgentsTab.js
│   ├── ToolsTab.js
│   └── AgentDetail.js
├── screens/
│   ├── SermonWriter.js
│   ├── GenZConnector.js
│   └── MiracleTab.js
├── config/
│   ├── agents.js
│   ├── firebase.js
│   └── auth.js
├── utils/
│   ├── mockData.js
│   ├── OfflineQueue.js
│   └── WebSocketManager.js
└── services/
    └── api.js
assets/
└── splash.png (create 1242x2436 PNG with church logo on #001a33 background)
tests/
e2e/
docs/
└── privacy-policy.md
```

### 5. Configure app.json

```json
{
  "expo": {
    "name": "ECLA-AI",
    "slug": "ecla-ai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "jsEngine": "hermes",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#001a33"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ecla.eclacai",
      "infoPlist": {
        "NSMicrophoneUsageDescription": "Voice input for sermon prompts.",
        "NSLocationWhenInUseUsageDescription": "Locate nearby volunteer opportunities."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#001a33"
      },
      "permissions": ["RECORD_AUDIO", "ACCESS_FINE_LOCATION"]
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

## Core Configuration Files (Day 1 Afternoon)

### 6. Create src/config/agents.js

```javascript
export const AGENT_URLS = {
  Pastoral: 'https://yourvercel.app/agents/pastoral',
  Planning: 'https://yourvercel.app/agents/planning',
  Community: 'https://yourvercel.app/agents/community',
  Music: 'https://yourvercel.app/agents/music',
  Outreach: 'https://yourvercel.app/agents/outreach',
  Counseling: 'https://yourvercel.app/agents/counseling',
  Admin: 'https://yourvercel.app/agents/admin',
  Prayer: 'https://yourvercel.app/agents/prayer'
};

export const AGENT_ICONS = {
  Pastoral: '✝️',
  Planning: '📅',
  Community: '👥',
  Music: '🎵',
  Outreach: '🌍',
  Counseling: '💙',
  Admin: '⚙️',
  Prayer: '🙏'
};
```

### 7. Create src/config/firebase.js

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  // Add your Firebase config here
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence disabled');
  } else if (err.code === 'unimplemented') {
    console.log('Browser doesn\'t support persistence');
  }
});

export { db, analytics, logEvent };
```

### 8. Create src/config/auth.js

```javascript
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth-token';

export const AuthService = {
  async getToken() {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },
  
  async setToken(token) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  
  async clearToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
  
  getInjectedJavaScript(token) {
    return `
      window.localStorage.setItem('auth-token', '${token}');
      window.ReactNativeWebView.postMessage('auth-ready');
      true;
    `;
  }
};
```

### 9. Create src/services/api.js

```javascript
import axios from 'axios';
import { AuthService } from '../config/auth';

const API_BASE = 'https://yourvercel.app/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const API = {
  async generateSermon(prompt, length) {
    const response = await apiClient.post('/sermon-generate', { prompt, length });
    return response.data;
  },
  
  async postToSocial(text) {
    const response = await apiClient.post('/postToX', { text });
    return response.data;
  },
  
  async getVolunteerNeeds(lat, lng, radius = 10) {
    const response = await apiClient.get('/volunteer-needs', {
      params: { lat, lng, radius }
    });
    return response.data;
  }
};
```

### 10. Create src/utils/OfflineQueue.js

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const QUEUE_KEY = '@offline_queue';

export class OfflineQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.initNetListener();
  }
  
  async initNetListener() {
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.isProcessing) {
        this.processQueue();
      }
    });
    await this.loadQueue();
  }
  
  async loadQueue() {
    try {
      const stored = await AsyncStorage.getItem(QUEUE_KEY);
      this.queue = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load queue:', error);
    }
  }
  
  async saveQueue() {
    try {
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error('Failed to save queue:', error);
    }
  }
  
  async enqueue(action) {
    this.queue.push({
      id: Date.now().toString(),
      action,
      timestamp: Date.now()
    });
    await this.saveQueue();
    
    const netState = await NetInfo.fetch();
    if (netState.isConnected) {
      this.processQueue();
    }
  }
  
  async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const item = this.queue[0];
      try {
        await item.action();
        this.queue.shift();
        await this.saveQueue();
      } catch (error) {
        console.error('Failed to process queue item:', error);
        break;
      }
    }
    
    this.isProcessing = false;
  }
  
  getQueueLength() {
    return this.queue.length;
  }
}

export default new OfflineQueue();
```

### 11. Create src/utils/WebSocketManager.js

```javascript
export class WebSocketManager {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.listeners = {};
  }
  
  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };
    
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.emit(data.type, data.payload);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.reconnect();
    };
  }
  
  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }
    
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    
    setTimeout(() => {
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      this.connect();
    }, delay);
  }
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
  
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
```

## Navigation & UI Components (Day 2)

### 12. Create App.js

See the plan file for the complete App.js code with Sentry initialization, splash screen, navigation container, and tab setup.

### 13. Create src/components/AgentsTab.js

See the plan file for the complete AgentsTab component using FlashList, memoized cards, and accessibility support.

### 14. Create src/components/AgentDetail.js

See the plan file for the complete AgentDetail component with secure WebView, JWT injection, and memory management.

### 15. Create src/components/ToolsTab.js

See the plan file for the ToolsTab component with vertical scroll layout.

## Hero Features (Days 3-4)

### 16. Create src/screens/SermonWriter.js

See the plan file for complete SermonWriter with:
- Voice recording with streaming transcription
- Picker for length selection
- API integration with JWT auth
- Firebase storage + offline queue
- Haptic feedback

### 17. Create src/screens/GenZConnector.js

See the plan file for complete GenZConnector with:
- Text input with character counter
- Social posting API
- WebSocket real-time updates
- FlashList for post display

### 18. Create src/screens/MiracleTab.js

See the plan file for complete MiracleTab with:
- Location permissions and access
- MapView with markers
- Volunteer opportunities listing
- Haptic feedback on signup

## Testing & Deployment (Days 5-10)

### 19. Install Testing Dependencies

```bash
npm install --save-dev jest@29.7.0 jest-expo@54.0.0 @testing-library/react-native@12.6.0 detox@20.0.0
```

### 20. Create eas.json

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Debug"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release",
        "cache": {
          "key": "ios-deps-{{ checksum 'package-lock.json' }}",
          "paths": ["node_modules", "ios/Pods"]
        },
        "env": {
          "EXPO_USE_FAST_RESOLVER": "1"
        }
      }
    },
    "production": {
      "ios": {
        "buildConfiguration": "Release"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 21. Create .env File

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain_here
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket_here
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id_here
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
EXPO_PUBLIC_USE_MOCKS=false
```

### 22. Create docs/privacy-policy.md

```markdown
# ECLA-AI Privacy Policy

Last updated: October 26, 2025

## Data We Collect
- Voice recordings for sermon generation (processed and deleted)
- Location data for volunteer opportunities (with permission)
- Anonymous usage analytics via Firebase
- Prayer requests and sermon drafts (stored locally and synced)

## How We Use Data
- Improve AI-generated sermons
- Match volunteers with local needs
- Provide personalized ministry tools

## Data Sharing
We do not sell or share personal data with third parties except:
- Firebase/Google Cloud for infrastructure
- Required by law

## User Rights
- Request data deletion
- Export your data
- Opt out of analytics

Contact: privacy@ecla-ai.com
```

### 23. Build Commands

**Local Development Build:**
```bash
eas build --platform ios --profile development --local
```

**TestFlight Preview Build:**
```bash
eas build --platform ios --profile preview
```

**Submit to TestFlight:**
```bash
eas submit --platform ios
```

## Daily Checklist

- **Day 1:** ✅ Project setup, dependencies, file structure, configuration files
- **Day 2:** ✅ Navigation, AgentsTab, AgentDetail, ToolsTab skeleton
- **Day 3:** ✅ SermonWriter with voice and API integration
- **Day 4:** ✅ GenZConnector and MiracleTab with WebSocket/location
- **Day 5:** ✅ OfflineQueue, Firebase setup, error boundaries
- **Day 6:** ✅ Dark mode, splash screen, accessibility improvements
- **Day 7:** ✅ Security hardening, testing setup, write tests
- **Day 8:** ✅ E2E tests, privacy policy, Apple review prep
- **Day 9:** ✅ EAS build configuration, first builds
- **Day 10:** ✅ TestFlight submission, final QA, bug fixes

## Success Verification

Before submitting to TestFlight, verify:

- [ ] All 8 agents open correctly in WebViews with JWT auth
- [ ] Voice recording works and generates sermons
- [ ] Social posting creates posts and shows live updates
- [ ] Map shows user location and volunteer opportunities
- [ ] Offline queue syncs when network restored
- [ ] Splash screen displays for 2 seconds
- [ ] Dark theme applied throughout
- [ ] No crashes in Sentry dashboard
- [ ] Privacy policy accessible in app
- [ ] App runs smoothly on iOS 18+ device

Execute these instructions sequentially. Each file must be created exactly as specified. Test thoroughly at each milestone before proceeding.

