function main() {
    document.querySelector(".hero .button").addEventListener("click", onTextSearch)
    document.querySelector(".hero .text-box").addEventListener("keydown", (e) => {
        if (e.key === "Enter")
            onTextSearch()
    })

    onTextSearch()
}

async function onTextSearch() {
    const txtSearch = document.querySelector(".hero .text-box")
    const search = txtSearch.value.trim() || 'London'
    const place = await getGeoData(search)

    if (place){
        const weather = await getWeather(place.latitude, place.longitude)
        const chooseDay = document.querySelector(".hourly .dropdown")

        if (weather) {
            renderCurrentWeather(place, weather)
            renderDailyForecast(weather.days)
            renderDayOptions(weather.days)
            renderHourlyForecast(weather.hours, chooseDay.value)

            chooseDay.onchange = () => {
                renderHourlyForecast(weather.hours, chooseDay.value)
            }
        } else {
            return
        }

    } else {
        alert(`City "${search}" not found`)
    }
}

main()