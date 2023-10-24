setTimeout(() => {
    const weatherOptions = JSON.parse(fs.readFileSync(folderPath + "\\weatherOptions.json"), 'utf8')

    const locationName = document.getElementById("autocomplete-name");
    const locationCountry = document.getElementById("autocomplete-country")

    async function setStandardLocation() {
        if (weatherOptions.iplocation == true) {
            const responseIP = await fetch('https://api.ipify.org?format=json');
            const dataIP = await responseIP.json();
            const publicIP = dataIP.ip;

            const responseLocation = await fetch(`http://ip-api.com/json/${publicIP}`);
            const dataLocation = await responseLocation.json();

            locationName.innerHTML = dataLocation.city;
            locationCountry.innerHTML = dataLocation.country;
        } else {
            locationName.innerHTML = weatherOptions.weather_name
            locationCountry.innerHTML = weatherOptions.weather_country
        }

    }

    setStandardLocation()

    const input = document.getElementById("search")

    input.addEventListener('keydown', (event) => {
        let length = (input.value).length;
        if (length > 1) {
            setAutocomplete(input.value)
        }
    })

    document.getElementsByClassName("bubble-content")[0].addEventListener("click", () => {
        if (locationCountry.innerHTML == "wrong") {
            return;
        }
        weatherOptions.weather_country = locationCountry.innerHTML;
        weatherOptions.weather_name = locationName.innerHTML;
        fs.writeFileSync(folderPath + "\\weatherOptions.json", JSON.stringify(weatherOptions, null, 4), 'utf8')
    })

    async function setAutocomplete(value) {
        const weatherURL = `http://api.weatherapi.com/v1/search.json?key=0d6f65c595974c82b19143504232708&q=${value}`

        const responseWeather = await fetch(weatherURL);
        const dataWeather = await responseWeather.json();

        locationName.innerHTML = dataWeather[0].name;
        locationCountry.innerHTML = dataWeather[0].country;
    }

    const checkBox = document.getElementById("ip-checkbox");
    checkBox.checked = weatherOptions.iplocation;

    if (weatherOptions.iplocation == true) {
        document.getElementById("search").disabled = true
        document.getElementById("search").style.opacity = 0.3
        document.getElementById("container-autocomplete").style.cursor = "default";
        document.getElementById("container-autocomplete").style.opacity = 0.3
    }

    checkBox.addEventListener('change', (event) => {
        weatherOptions.iplocation = event.currentTarget.checked;
        fs.writeFileSync(folderPath + "\\weatherOptions.json", JSON.stringify(weatherOptions, null, 4), 'utf8')
        if (event.currentTarget.checked) {
            document.getElementById("search").disabled = true
            document.getElementById("search").style.opacity = 0.3
            document.getElementById("container-autocomplete").style.cursor = "default";
            document.getElementById("container-autocomplete").style.opacity = 0.3
        } else {
            document.getElementById("search").disabled = false
            document.getElementById("search").style.opacity = 1
            document.getElementById("container-autocomplete").style.cursor = "pointer";
            document.getElementById("container-autocomplete").style.opacity = 1
        }
    })
}, 200);