function setColor(red, green, blue) {
    const colorData = {
        red: red,
        green: green,
        blue: blue
    };

    fs.writeFileSync(path.join(folderPath, 'color.json'), JSON.stringify(colorData, null, 4));
}

