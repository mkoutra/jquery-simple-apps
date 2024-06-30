/**
 * A simple background changer with random colors.
 * 
 * @author Michalis Koutrakis
*/

const COLOR_HEX_LENGTH = 6  // Without #

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
 * Generates a random hexadecimal color string.
 * 
 * @returns {string}    A randomly generated hexadecimal
 *                      color string.
 */
function getColor() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F']
    const digits = ['0', '1' ,'2', '3', '4', '5', '6', '7', '8', '9']
    const alphabet = [...letters, ...digits]
    let color = "#"
    let randomIndex = 0

    for (let i = 0; i < COLOR_HEX_LENGTH; i++) {
        randomIndex = Math.floor(Math.random() * alphabet.length)
        color += alphabet[randomIndex]
    }

    return color
}

/**
 * Changes the background color and
 * updates the displayed color text.
 */
function changeColor() {
    const color = getColor()

    changeBgColor(color)
    changeColorText(color)
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