setTimeout(() => {
    const flightOptions = JSON.parse(fs.readFileSync(folderPath + "\\flightOptions.json"), 'utf8')

    const input = document.getElementById("input")
    const applyButton = document.getElementById("applyButton")
    const resetButton = document.getElementById("resetButton")
    input.innerHTML = flightOptions.flight_code;

    function saveJSON() {
        const flightData = {
            flight_code: input.value
        };

        fs.writeFileSync(folderPath + "\\flightOptions.json", JSON.stringify(flightData, null, 4))
    }

    applyButton.addEventListener('click', (event) => {
        saveJSON()
    })

    resetButton.addEventListener('click', (event) => {
        input.value = ""

        saveJSON()
    })

}, 200);

