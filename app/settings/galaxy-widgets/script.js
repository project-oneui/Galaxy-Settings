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
    container.style.height = '24px';

    // Toggle the visibility of hidden-preview
    if (hiddenPreview.classList.contains('hidden')) {
        hiddenPreview.classList.remove('hidden');
    } else {
        hiddenPreview.classList.add('hidden');
    }

    if (hiddenPreview.classList.contains('hidden')) {
        container.style.height = '48px';
    } else {
        container.style.height = hiddenPreview.offsetHeight + 40 + "px";
    }

    setTimeout(() => {
        // Adjust the container height based on hidden-preview visibility

        if (hiddenPreview.classList.contains('hidden')) {
            hiddenPreview.style.opacity = "0";
        } else {
            hiddenPreview.style.opacity = "1";
        }
    }, 300);

}