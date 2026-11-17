const DEFAULT_ICON = "icon-partly-cloudy.webp"

const WEATHER_ICONS = [
    { icon: "icon-sunny.webp", codes: [0] },
    { icon: "icon-partly-cloudy.webp", codes: [1, 2, 3] },
    { icon: "icon-fog.webp", codes: [45, 48] },
    { icon: "icon-drizzle.webp", codes: [51, 53, 55, 56, 57] },
    { icon: "icon-rain.webp", codes: [61, 63, 65, 66, 67, 80, 81, 82] },
    { icon: "icon-snow.webp", codes: [71, 73, 75, 77, 85, 86] },
    { icon: "icon-storm.webp", codes: [95, 96, 99] },
]

function getWeatherIcon(code) {
    const match = WEATHER_ICONS.find(({ codes }) => codes.includes(code))
    return ICON_PATH + (match ? match.icon : DEFAULT_ICON)
}

function renderCurrentWeather(place, weather) {
    currentCity.textContent = `${place.name}, ${place.country}`
    currentDate.textContent = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(weather.current.time))

    currentIcon.src = getWeatherIcon(weather.current.weather_code)
    currentTemperature.textContent = `${weather.current.temperature_2m} ${UNITS.temperature.label}`
    currentApparentTemperature.textContent = `${weather.current.apparent_temperature} ${UNITS.temperature.label}`
    currentHumidity.textContent = `${weather.current.relative_humidity_2m} ${UNITS.humidity.label}`
    currentWind.textContent = `${weather.current.wind_speed_10m} ${UNITS.wind.label}`
    currentPrecipitation.textContent = `${weather.current.precipitation} ${UNITS.precipitation.label}`
    currentAverageTemperature.textContent =
        weather.avgToday !== null
            ? `${weather.avgToday} ${UNITS.temperature.label}`
            : "N/A"
}

function renderDailyForecast(days) {
    forecastContainer.innerHTML = ""

    days.forEach((day, index) => {
        const clone = forecastTemplate.content.cloneNode(true)

        const forecastDay = clone.querySelector(".daily-day")
        const dailyName = clone.querySelector(".daily-name")
        const dailyIcon = clone.querySelector(".daily-icon")
        const dailyMinTemperature = clone.querySelector(
            ".daily-min-temperature",
        )
        const dailyMaxTemperature = clone.querySelector(
            ".daily-max-temperature",
        )

        forecastDay.style.setProperty("--i", index)
        dailyName.textContent = day.weekDate
        dailyIcon.src = getWeatherIcon(day.weatherCode)
        dailyIcon.alt = `Weather icon for ${day.weekDate}`
        dailyMinTemperature.textContent = `${day.min} ${UNITS.temperature.label}`
        dailyMaxTemperature.textContent = `${day.max} ${UNITS.temperature.label}`

        forecastContainer.appendChild(clone)
    })
}

function renderDayOptions(days) {
    chooseDay.innerHTML = ""

    days.forEach((day) => {
        const option = document.createElement("option")

        option.value = day.fullDate
        option.textContent = day.weekDate

        chooseDay.appendChild(option)
    })
}

function renderHourlyForecast(hours, selectedDate) {
    hourlyContainer.innerHTML = ""

    const filteredHours = hours.filter((hour) => hour.fullDate === selectedDate)

    filteredHours.forEach((hour, index) => {
        const clone = hourlyTemplate.content.cloneNode(true)

        const forecastHour = clone.querySelector(".hourly-hour")
        const hourlyIcon = clone.querySelector(".hourly-icon")
        const hourly = clone.querySelector(".hour")
        const hourlyTemperature = clone.querySelector(".hourly-temperature")

        forecastHour.style.setProperty("--i", index)

        hourly.textContent = hour.hour
        hourlyIcon.src = getWeatherIcon(hour.weatherCode)
        hourlyIcon.alt = `Weather icon for ${hour.hour}`
        hourlyTemperature.textContent = `${hour.temperature} ${UNITS.temperature.label}`

        hourlyContainer.appendChild(clone)
    })
}
