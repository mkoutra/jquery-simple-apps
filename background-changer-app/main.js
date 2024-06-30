/**
 * A simple background changer with basic colors.
 * 
 * @author Michalis Koutrakis
*/

$(function() {
    $('#button').on('click', onClickMeButtonClicked)
})

// Controller

/**
 * Handles the 'Click Me' button click event.
 * Changes the background color.
 */
function onClickMeButtonClicked() {
    changeColor()
}

// Model

/**
 * Generates a random color from a predefined list of colors.
 * 
 * @returns {string} A randomly selected color.
 */
function getColor() {
    const colors = ['black', 'red', 'green', 'blue', 'white']
    let randomIndex = Math.floor(Math.random() * colors.length)
    let color = colors[randomIndex]
    
    return color
}

/**
 * Changes the background color and
 * updates the displayed color text.
 */
function changeColor() {
    const color = getColor()

    changeColorText(color)
    changeBgColor(color)
}

/**
 * Updates the displayed color text.
 * 
 * @param {string} colorStr The color string to display.
 */
function changeColorText(colorStr) {
    $('#colorText').html(colorStr)
}

/**
 * Changes the background color of the page.
 * 
 * @param {string} color    The color to set as the background.
 */
function changeBgColor(color) {
    $('body').css("background-color", color)
}