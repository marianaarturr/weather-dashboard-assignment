# Weather Dashboard

## Description
A modern, responsive weather dashboard web application that allows users to search for any city and view real-time weather conditions, daily forecasts, and hourly breakdowns. The app features dynamic weather icons, smooth CSS animations, and localized metrics.

## Functionalities
- **City Search**: Search for any location worldwide using the Open-Meteo Geocoding API. Supports both button clicks and pressing the `Enter` key.
- **Current Weather**: Displays current temperature, apparent temperature ("feels like"), humidity, wind speed, precipitation, and today's average temperature.
- **Daily Forecast**: A 7-day forecast showing the day of the week, weather condition icons, minimum and maximum temperatures, and daily averages.
- **Hourly Forecast**: Interactive hourly breakdown for any selected day via a dropdown selector.
- **Responsive Design**: Fully adaptable layout optimized for desktop, tablet, and mobile screens, including custom CSS animations and support for reduced-motion preferences.

## How it uses the public API
The application uses two free public APIs provided by **Open-Meteo** (no API key required):
1. **Geocoding API**: Converts a city name search query into geographic coordinates (latitude and longitude).
2. **Forecast API**: Fetches current weather metrics, daily maximum/minimum temperatures, weather codes, and hourly forecasts based on coordinates.

## Requests Used
- **Geocoding Request Example**:
  ```text
  https://geocoding-api.open-meteo.com/v1/search?name=London&count=1&language=en&format=json
  ```

- **Weather Forecast Request Example** (built dynamically in `fetch.js`):
  ```text
  https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&timezone=auto&forecast_days=7
  ```

The API returns parallel arrays for hourly and daily parameters. The application parses and merges these arrays into structured objects per day and per hour, computing daily temperature averages programmatically in `utils.js`.

## Project Structure
```text
├── assets/
│   ├── fonts/
│   └── images/
├── css/
│   ├── animations.css
│   ├── main.css
│   ├── responsive.css
│   └── root.css
├── js/
│   ├── config.js
│   ├── dom.js
│   ├── fetch.js
│   ├── main.js
│   ├── render.js
│   └── utils.js
└── main.html
```

## Requirements
- A modern web browser with JavaScript enabled.
- A local static server (such as the **Live Server** extension in VS Code) to serve the files and load local assets properly.

## How to use
1. Clone or download the project repository.
2. Open the project folder in VS Code (or your preferred editor).
3. Start a local server pointing to `main.html` (e.g., right-click `main.html` and select **Open with Live Server**).
4. Enter a city name in the search bar and click **Search** or press `Enter`.

## Author
- Mariana Artur 2023214572