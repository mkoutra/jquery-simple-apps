/**
 * A simple counter.
 * 
 * @author Michalis Koutrakis
*/

const DEFAULT_COUNTER = 0
let counter = DEFAULT_COUNTER

$(function() {
    $('#decrBtn').on('click', onDecreaseBtnClicked)
    $('#resetBtn').on('click', onResetBtnClicked)
    $('#incrBtn').on('click', onIncreaseBtnClicked)
})

// Controller

/** 
 * Handles the 'Decrease' button click event.
 * Decreases the counter.
 */
function onDecreaseBtnClicked() {
    decreaseCounter()
}

/**
 * Handles the 'Reset' button click event.
 * Resets the counter.
 */
function onResetBtnClicked() {
    resetCounter()
}


/**
 * Handles the 'Increase' button click event.
 * Increases the counter.
 */
function onIncreaseBtnClicked() {
    increaseCounter()    
}

//  Model

/**
 * Decreases the counter by one and renders to UI.
 */
function decreaseCounter() {
    counter--
    showCounter()
}

/**
 * Resets the counter to zero and renders to UI.
 */
function resetCounter() {
    counter = DEFAULT_COUNTER
    showCounter()
}

/**
 * Increases the counter by one and renders to UI.
 */
function increaseCounter() {
    counter++
    showCounter()
}

/**
 * Renders the counter to the UI.
 */
function showCounter() {
    decideCounterColor()
    $('#counter').text(counter)
}

/**
 * Updates the counter text color based on its value.
 * Red if negative, green if positive, black if zero.
 */
function decideCounterColor() {
    $('#counter').toggleClass('text-danger', counter < 0)
    $('#counter').toggleClass('text-success', counter > 0)
    $('#counter').toggleClass('text-black', counter === 0)
}
