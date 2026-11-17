async function fetchJson(url) {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }

    return response.json()
}

async function getGeoData(search) {
    try {
        const result = await fetchJson(buildGeoUrl(search))

        if (!result.results || result.results.length === 0) {
            return null
        }

        return result.results[0]
    } catch (error) {
        console.error(error.message)
        return null
    }
}

async function getWeather(lat, lon) {
    try {
        const apiData = await fetchJson(buildWeatherUrl(lat, lon))

        if (!apiData.current || !apiData.daily || !apiData.hourly) {
            console.error("Weather data not found")
            return null
        }

        return parseWeather(apiData)
    } catch (error) {
        console.error(error.message)
        return null
    }
}

function buildGeoUrl(search) {
    return `${API.geocoding}?name=${encodeURIComponent(search)}&count=1&language=en&format=json`
}

function buildWeatherUrl(lat, lon) {
    return (
        `${API.forecast}` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&hourly=temperature_2m,weather_code` +
        `&temperature_unit=${UNITS.temperature.api}` +
        `&wind_speed_unit=${UNITS.wind.api}` +
        `&precipitation_unit=${UNITS.precipitation.api}` +
        `&timezone=auto&forecast_days=7`
    )
}

function parseHours(apiData) {
    return apiData.hourly.time.map((hour, index) => ({
        fullDate: hour.slice(0, 10),
        hour: hour.slice(11, 16),
        weatherCode: apiData.hourly.weather_code[index],
        temperature: apiData.hourly.temperature_2m[index],
    }))
}

function parseDays(apiData, hours) {
    return apiData.daily.time.map((date, index) => {
        const dayTemps = hours
            .filter((h) => h.fullDate === date)
            .map((h) => h.temperature)

        return {
            fullDate: date,
            weekDate: new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                timeZone: "UTC",
            }),
            weatherCode: apiData.daily.weather_code[index],
            max: apiData.daily.temperature_2m_max[index],
            min: apiData.daily.temperature_2m_min[index],
            avg: average(dayTemps),
        }
    })
}

function parseWeather(apiData) {
    const hours = parseHours(apiData)
    const days = parseDays(apiData, hours)

    const todayDate = apiData.current.time.slice(0, 10)
    const today = days.find((d) => d.fullDate === todayDate)

    return {
        current: apiData.current,
        days,
        hours,
        avgToday: today ? today.avg : null,
    }
}
