const DEFAULT_CITY = "London"

const ICON_PATH = "../assets/images/"

const API = {
    geocoding: `https://geocoding-api.open-meteo.com/v1/search`,
    forecast: `https://api.open-meteo.com/v1/forecast`,
}

const UNITS = {
    temperature: { api: "celsius", label: "°C" },
    wind: { api: "kmh", label: "km/h" },
    precipitation: { api: "mm", label: "mm" },
    humidity: { label: "%" },
}
