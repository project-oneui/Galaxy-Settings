setTimeout(() => {
    const jsonFilePath = path.join(folderPath, 'widgetStates.json');
    const widgetStates = JSON.parse(fs.readFileSync(jsonFilePath), 'utf8');

    function updateWidgetState(widgetName, checkbox) {
        widgetStates[widgetName].show = checkbox.checked.toString();
        fs.writeFileSync(jsonFilePath, JSON.stringify(widgetStates, null, 4), 'utf8');
    }

    const checkboxes = [
        { name: 'musicWidget', element: document.getElementById('music-checkbox') },
        { name: 'batteryWidget', element: document.getElementById('battery-checkbox') },
        { name: 'deviceCareWidget', element: document.getElementById('deviceCare-checkbox') },
        { name: 'weatherWidget', element: document.getElementById('weather-checkbox') },
        { name: 'topStoriesWidget', element: document.getElementById('topStories-checkbox') },
        { name: 'flightWidget', element: document.getElementById('flight-checkbox') },
        { name: 'calendarWidget', element: document.getElementById('calendar-checkbox') },
        { name: 'quickNotesWidget', element: document.getElementById('quickNotes-checkbox') },
        { name: 'digitalClockWidget', element: document.getElementById('digitalClock-checkbox') },
        { name: 'forecastWidget', element: document.getElementById('forecast-checkbox') },
        { name: 'upcomingMoviesWidget', element: document.getElementById('upcomingMovies-checkbox') },
        { name: 'hoursForecastWidget', element: document.getElementById('hoursForecast-checkbox') },
    ];

    checkboxes.forEach((checkbox) => {
        checkbox.element.checked = widgetStates[checkbox.name].show === 'true';

        checkbox.element.addEventListener('change', (event) => {
            updateWidgetState(checkbox.name, event.target);
        });
    });

    function setCheckBoxes() {
        checkboxes.forEach((checkbox) => {
            checkbox.element.checked = widgetStates[checkbox.name].show === 'true';
        });
    }

    setInterval(setCheckBoxes, 500)
}, 200);

function togglePreview(containerId) {
    var container = document.getElementById(containerId);
    var hiddenPreview = container.querySelector('.hidden-preview');
    var previewButton = container.querySelector('.preview-button')
    container.style.height = '24px';
    let classList = hiddenPreview.classList

    function setPreviewButton() {
        let imageSrc = classList.contains('hidden') ? ".././res/ic_oui_keyboard_arrow_up.svg" : ".././res/ic_oui_keyboard_arrow_down.svg"
        previewButton.style.opacity = 0;
        setTimeout(() => {
            previewButton.src = imageSrc
            previewButton.style.opacity = 1;
        }, 150);
        (classList.contains('hidden')) ? hiddenPreview.classList.remove('hidden') : hiddenPreview.classList.add('hidden');
    }

    setPreviewButton()

    function expand() {
        (classList.contains('hidden')) ? container.style.height = '48px' : container.style.height = hiddenPreview.offsetHeight + 40 + "px";

        // timeout because of animation
        setTimeout(() => {
            // if hidden opacity = 0 else 1
            let opacity = classList.contains('hidden') ? 0 : 1

            hiddenPreview.style.opacity = opacity
        }, 300);
    }

    expand()

}