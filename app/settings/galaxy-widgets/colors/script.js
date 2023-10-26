function setColor(backgroundArray, textArray, secondaryArray, primaryArray) {
    const colorData = {
        background: {
            red: backgroundArray[0],
            green: backgroundArray[1],
            blue: backgroundArray[2]
        },
        text: {
            red: textArray[0],
            green: textArray[1],
            blue: textArray[2]
        },
        secondary: {
            red: secondaryArray[0],
            green: secondaryArray[1],
            blue: secondaryArray[2]
        },
        primary: {
            red: primaryArray[0],
            green: primaryArray[1],
            blue: primaryArray[2]
        }
    };

    fs.writeFileSync(path.join(folderPath, 'color.json'), JSON.stringify(colorData, null, 4));
}

