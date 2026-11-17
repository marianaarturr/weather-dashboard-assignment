const WEATHER_ICONS = [
    { icon: "icon-sunny.webp", codes: [0] },
    { icon: "icon-partly-cloudy.webp", codes: [1, 2, 3] },
    { icon: "icon-fog.webp", codes: [45, 48] },
    { icon: "icon-drizzle.webp", codes: [51, 53, 55, 56, 57] },
    { icon: "icon-rain.webp", codes: [61, 63, 65, 66, 67, 80, 81, 82] },
    { icon: "icon-snow.webp", codes: [71, 73, 75, 77, 85, 86] },
    { icon: "icon-storm.webp", codes: [95, 96, 99] },
]

function formatTemperature(value) {
    return `${value} °C`
}

function renderCurrentWeather(place, weather) {
    const { current, avgToday } = weather

    document.querySelector(".current .city").textContent = `${place.name}, ${place.country}`
    document.querySelector(".current .date").textContent = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(current.time))

    document.querySelector(".current .info .icon").src = getWeatherIcon(current.weather_code)
    document.querySelector(".current .info .temperature").textContent = formatTemperature(current.temperature_2m)
    document.querySelector(".current .apparent-temperature").textContent = formatTemperature(current.apparent_temperature)
    document.querySelector(".current .humidity").textContent = `${current.relative_humidity_2m} %`
    document.querySelector(".current .wind").textContent = `${current.wind_speed_10m} km/h`
    document.querySelector(".current .precipitation").textContent = `${current.precipitation} mm`
    document.querySelector(".current .average-temperature").textContent =
        avgToday !== null ? formatTemperature(avgToday) : "N/A"
}

function renderDailyForecast(days) {
    const forecastContainer = document.querySelector(".daily .container")
    const template = document.querySelector(".daily template")
    forecastContainer.innerHTML = ""

    days.forEach((day, index) => {
        const clone = template.content.cloneNode(true)

        const forecastDay = clone.querySelector(".day")
        const dailyName = clone.querySelector(".name")
        const dailyIcon = clone.querySelector(".icon")
        const dailyMinTemperature = clone.querySelector(".min-temperature")
        const dailyMaxTemperature = clone.querySelector(".max-temperature")

        forecastDay.style.setProperty("--i", index)
        dailyName.textContent = day.weekDate
        dailyIcon.src = getWeatherIcon(day.weatherCode)
        dailyIcon.alt = `Weather icon for ${day.weekDate}`
        dailyMinTemperature.textContent = formatTemperature(day.min)
        dailyMaxTemperature.textContent = formatTemperature(day.max)

        forecastContainer.appendChild(clone)
    })
}

function renderDayOptions(days) {
    const chooseDay = document.querySelector(".hourly .dropdown")
    chooseDay.innerHTML = ""

    days.forEach((day) => {
        const option = document.createElement("option")

        option.value = day.fullDate
        option.textContent = day.weekDate

        chooseDay.appendChild(option)
    })
}

function renderHourlyForecast(hours, selectedDate) {
    const hourlyContainer = document.querySelector(".hourly .container")
    const template = document.querySelector(".hourly template")
    hourlyContainer.innerHTML = ""

    const filteredHours = hours.filter((hour) => hour.fullDate === selectedDate)

    filteredHours.forEach((hour, index) => {
        const clone = template.content.cloneNode(true)

        const forecastHour = clone.querySelector(".hour")
        const hourlyIcon = clone.querySelector(".icon")
        const hourlyTime = clone.querySelector(".time")
        const hourlyTemperature = clone.querySelector(".temperature")

        forecastHour.style.setProperty("--i", index)

        hourlyTime.textContent = hour.hour
        hourlyIcon.src = getWeatherIcon(hour.weatherCode)
        hourlyIcon.alt = `Weather icon for ${hour.hour}`
        hourlyTemperature.textContent = formatTemperature(hour.temperature)

        hourlyContainer.appendChild(clone)
    })
}

function getWeatherIcon(code) {
    const match = WEATHER_ICONS.find(({ codes }) => codes.includes(code))
    return "../assets/images/" + (match ? match.icon : "icon-partly-cloudy.webp")
}