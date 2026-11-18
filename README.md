# Weather Dashboard

## Description
A modern, responsive weather dashboard web application that allows users to search for any city and view real-time weather conditions, daily forecasts, and hourly breakdowns. The app features dynamic weather icons, smooth CSS animations, and localized metrics.

## Functionalities
- **City Search**: Search for any location worldwide using the Open-Meteo Geocoding API. Supports both button clicks and pressing the `Enter` key.
- **Default Location**: Automatically loads weather data for **London** on startup if no search query is provided.
- **Current Weather**: Displays current temperature, apparent temperature ("feels like"), humidity, wind speed, precipitation, and today's programmatically calculated average temperature.
- **Daily Forecast**: A 7-day forecast showing the day of the week, weather condition icons, minimum and maximum temperatures.
- **Hourly Forecast**: Interactive hourly breakdown for any selected day via a dynamic dropdown selector.
- **Responsive Design**: Fully adaptable layout optimized for desktop, tablet, and mobile screens, including staggered CSS animations and support for reduced-motion preferences.

## How it uses the public API
The application uses two free public APIs provided by **Open-Meteo** (no API key required):
1. **Geocoding API**: Converts a city name search query into geographic coordinates (latitude and longitude).
2. **Forecast API**: Fetches current weather metrics, daily maximum/minimum temperatures, weather codes, and hourly forecasts based on coordinates.

## Requests Used
- **Geocoding Request Example**:
  ```http
  https://open-meteo.com
  ```

- **Weather Forecast Request Example** (built dynamically):
  ```http
  https://open-meteo.com
  ```

The API returns parallel arrays for hourly and daily parameters. The application parses and merges these arrays into structured JavaScript objects per day and per hour, computing daily temperature averages dynamically.

## Project Structure
```text
├── assets/
│   ├── fonts/
│   │   └── BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf
│   └── images/
│       ├── icon-sunny.webp
│       ├── icon-partly-cloudy.webp
│       ├── icon-fog.webp
│       ├── icon-drizzle.webp
│       ├── icon-rain.webp
│       ├── icon-snow.webp
│       └── icon-storm.webp
├── css/
│   ├── animations.css   # Keyframes (fade-up, float, slide-in)
│   ├── main.css         # Main desktop grid layout
│   ├── responsive.css   # Media queries for tablets and mobile devices
│   └── root.css         # Global styles and central typography variables
├── js/
│   ├── main.js         # API fetching, URL builders, and core logic
│   └── render.js       # DOM manipulation and data visualization UI
└── main.html           # Main HTML structure with templates
```

## Requirements
- A modern web browser with JavaScript enabled.
- A local static server (such as the **Live Server** extension in VS Code) to serve the files and load local assets properly.

## How to use
1. **Open the project**: Open the project folder inside Visual Studio Code or your preferred text editor.
2. **Launch Live Server**: Right-click on `main.html` and select **Open with Live Server**. This step is mandatory so that assets (fonts and images) and DOM templates load correctly.
3. **Explore Initial State**: On startup, the application will automatically fetch and display the real-time weather for **London** as the default city.
4. **Search a City**: Type any city name in the input box at the top (e.g., "Lisbon", "Paris", "New York") and press the `Enter` key or click the **Search** button.
5. **Check Hourly Breakdown**: Use the dropdown selector inside the hourly section to switch between days and inspect temperature variations hour by hour.

## Author
- Mariana Artur (2023214572)

## Link
https://github.com/marianaarturr/weather-dashboard-assignment