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
        { name: 'newsWidget', element: document.getElementById('news-checkbox') },
        { name: 'flightWidget', element: document.getElementById('flight-checkbox') },
        { name: 'calendarWidget', element: document.getElementById('calendar-checkbox') },
        { name: 'notesWidget', element: document.getElementById('notes-checkbox') },
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
