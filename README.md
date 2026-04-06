# SkyView Weather 

A React Native weather application built with Expo Router and SDK 54. Get current weather conditions and 5-day forecasts for any city, with dark mode support and favorite city management.

**Module:** Mobile Applications (UFCF7H-15-3)
**Built with:** React Native 0.81 | Expo 54 | React 19.1 | Expo Router v6

---

## Features

 **Core Functionality**
-  **Current Weather** — Real-time temperature, conditions, humidity, wind speed
-  **5-Day Forecast** — Hourly/daily weather predictions
-  **City Search** — Instantly search and view weather for any city
-  **Favorites** — Save your favorite cities (persisted with AsyncStorage)
-  **Dark Mode** — Toggle between light and dark themes
-  **Unit Toggle** — Switch between Celsius and Fahrenheit

**Technical Highlights**
- Bottom tab navigation (4 screens: Home, Search, Favorites, Settings)
- React Context API for state management (favorites, settings, last searched city)
- AsyncStorage for persistent data (auto-loads on app launch)
- Pull-to-refresh on home screen
- Error handling with retry buttons
- Loading states with spinner

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React Native 0.81.5 |
| **Runtime** | Expo SDK 54.0.0 |
| **Navigation** | Expo Router v6 (file-based routing) |
| **State Management** | React Context API + Hooks |
| **Persistence** | AsyncStorage |
| **Weather Data** | OpenWeatherMap API |
| **Icons** | Ionicons + @expo/vector-icons |
| **UI Components** | React Native built-ins (View, Text, FlatList, etc.) |

---

## Project Structure

```
WeatherApp/
├── app/                              # Expo Router (file-based routing)
│   ├── _layout.js                    # Root layout with AppProvider wrapper
│   └── (tabs)/                       # Tab group
│       ├── _layout.js                # Tab navigator config
│       ├── index.js                  # Home screen (current weather + forecast)
│       ├── search.js                 # Search screen (city lookup)
│       ├── favorites.js              # Favorites screen (saved cities)
│       └── settings.js               # Settings screen (dark mode + units)
├── src/
│   ├── context/
│   │   └── AppContext.js             # State management (Context + Provider)
│   ├── components/
│   │   ├── WeatherCard.js            # Current weather display card
│   │   ├── ForecastItem.js           # 5-day forecast row item
│   │   └── LoadingSpinner.js         # Loading indicator
│   ├── services/
│   │   └── weatherApi.js             # OpenWeatherMap API calls
│   └── utils/
│       ├── storage.js                # AsyncStorage helper functions
│       └── theme.js                  # Light/dark theme color definitions
├── package.json                      # Dependencies (Expo SDK 54 compatible)
├── app.json                          # Expo config
├── babel.config.js                   # Babel preset for Expo
└── .gitignore                        # Git ignore file (excludes node_modules)
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Step 1: Clone and Install
```bash
git clone https://github.com/Xushuz/WeatherApp
cd WeatherApp
npm install
```

### Step 2: Start the Dev Server
```bash
npx expo start --tunnel --clear
```

- `--tunnel` allows scanning QR code even if phone is on different network
- `--clear` clears Metro bundler cache

### Step 3: Scan QR Code
Open Expo Go on your phone and scan the QR code displayed in the terminal.

---

## How It Works

### State Management (Context API)
The `AppContext` manages global state across all screens:
```javascript
{
  favorites: string[],           // Saved city names
  settings: {
    darkMode: boolean,           // Light/dark mode toggle
    units: 'metric' | 'imperial' // °C or °F
  },
  lastCity: string              // Last searched/viewed city
}
```

### Data Persistence (AsyncStorage)
Three key values are persisted to device storage:
- `@weather_favorites` — Array of favorite city names
- `@weather_settings` — Theme and temperature unit preferences
- `@weather_last_city` — Last searched city (loads on app launch)

### API Integration
Weather data from [OpenWeatherMap API](https://openweathermap.org/api):
- **Current Weather** — `/weather?q={city}&units={units}&appid={key}`
- **5-Day Forecast** — `/forecast?q={city}&units={units}&appid={key}`

---

## Key Features Explained

### Home Screen
- Displays current weather for the last searched city (default: London)
- 5-day forecast filtered to midday observations
- Heart icon to add/remove from favorites
- Pull-to-refresh to update weather
- Error state with retry button

### Search Screen
- Text input to search any city name
- Displays weather card with current conditions
- Quick actions: "View Full Weather" (navigates to home) and "Save" (adds to favorites)
- Error handling for invalid city names

### Favorites Screen
- FlatList of all saved cities with weather previews
- Tap a city to load it on home screen
- Swipe/tap trash icon to remove from favorites
- Empty state message when no favorites exist

### Settings Screen
- Dark mode toggle (affects all screens instantly)
- Temperature unit toggle (°C ↔ °F)
- App info and version

---

## Known Limitations

- Forecast data limited to 5-day API endpoint (not 10-day)
- Search is city-name-only (no geographic coordinates)
- No offline caching beyond last load
- Weather icons depend on OpenWeatherMap server availability

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | Run `npm install` again, then `npx expo start --clear` |
| Can't find city | Check spelling; some small towns may not be in the database |
| Dark mode not applying | Restart app after toggling in Settings |
| Favorites not persisting | Check device storage permissions in settings |

---

## Future Improvements

- Geolocation-based weather (device GPS)
- Hourly forecast view
- Multiple language support
- Push notifications for weather alerts
- Offline mode with cached data
- Weather maps integration

---

## Dependencies

All dependencies are locked to Expo SDK 54 compatible versions:
- `expo@~54.0.0` — Expo runtime
- `expo-router@~6.0.0` — File-based routing
- `expo-linking@~8.0.0` — Deep linking support
- `expo-constants@~18.0.0` — App constants
- `@react-native-async-storage/async-storage@2.2.0` — Persistent storage
- `react-native-screens@~4.16.0` — Navigation optimization
- `react-native-safe-area-context@~5.6.0` — Safe area handling

**Note:** `node_modules/` is excluded via `.gitignore`. After cloning, run `npm install` to restore all dependencies locally.

---

## Development Workflow

To develop locally:

```bash
# Start dev server
npx expo start

# Options
npx expo start --tunnel          # Tunnel mode (recommended)
npx expo start --ios             # iOS simulator
npx expo start --android         # Android emulator
npx expo start --web             # Web browser (experimental)
```

---

## License

This project is created as coursework for UFCF7H-15-3 (Mobile Applications).

---

## Author

**Ali Shaikhaan Fazeen**
06 April 2026
