async function loadWeather() {
    let search = txtSearch.value.trim()

    if (!search) {
        search = DEFAULT_CITY
    }

    const place = await getGeoData(search)

    if (!place) {
        alert(`City "${search}" not found`)
        return
    }

    const weather = await getWeather(place.latitude, place.longitude)

    if (!weather) {
        return
    }

    renderCurrentWeather(place, weather)
    renderDailyForecast(weather.days)
    renderDayOptions(weather.days)

    chooseDay.value = weather.days[0].fullDate
    renderHourlyForecast(weather.hours, chooseDay.value)

    chooseDay.onchange = () => {
        renderHourlyForecast(weather.hours, chooseDay.value)
    }
}

btnSearch.addEventListener("click", loadWeather)

txtSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        loadWeather()
    }
})

loadWeather()
