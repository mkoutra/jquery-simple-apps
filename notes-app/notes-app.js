/**
 * @author Michalis Koutrakis
*/

const daysGR = ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
const monthsGR = ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαίου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']

const daysENG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthsENG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let clock = null
let lang = 'GR'
let noteId = 0

$(function () {
    showTime('GR') // Show the current time

    $('#addNoteBtn').on('click', onAddNoteBtnClicked)
    $('#inputNote').on('keyup', (event) => onInputNoteKeyup(event))
    $('#langBtn').on('click', onLangBtnClicked)
})

// Controller

/**
 * Handles the '+' button click event.
 * Retrieves the input text and calls the note handler.
 */
function onAddNoteBtnClicked() {
    inputText = $('#inputNote').val().trim()
    addNoteHandler(inputText)
}

/**
 * Handles the keyup event on the input field.
 * Adds a note if the Enter key is pressed.
 * 
 * @param {Event} event - The keyup event.
 */
function onInputNoteKeyup(event) {
    if (event.key === 'Enter') {
        inputText = $('#inputNote').val().trim()
        addNoteHandler(inputText)
    }
}

/**
 * Handles the 'X' button click event.
 */
function onDelBtnClicked(component) {
    deleteNoteComponent(component)
}

/**
 * Handles the checkbox click event.
 * @param component 
 */
function onCheckBoxClicked(component) {
    strikeThrough(component)
}

/**
 * Handles the translation button click event.
 * Changes the language.
 */
function onLangBtnClicked() {
    changeLanguage()
    showTime(lang)
}

// Model

/**
 * Prints the time in the
 * given language
 * 
 * @param {string} lang 'GR' for Greek, 'ENG' for English
 */
function showTime(lang) {
    // Remove the previous clock before creating a new one.
    if (clock) clearInterval(clock)

    if (lang === 'GR') {
        clock = setInterval(printDate, 1000, daysGR, monthsGR)
    } else {
        clock = setInterval(printDate, 1000, daysENG, monthsENG) 
    }
}

/**
 * Prints date using the day and months names give.
 * 
 * @param daysNames     array with the name of each day 
 * @param monthsNames   array with the name of each month
 */
function printDate(daysNames, monthsNames) {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const day = currentDate.getDay()    // 0->sunday, 6->saturday
    const date = currentDate.getDate()
    
    let fullTimeStr = currentDate.toLocaleTimeString()
    let dateString = `${daysNames[day]}, ${date} ${monthsNames[month]} ${year}<br>` + fullTimeStr
    
    $('#dateText').html(dateString)
}

/**
 * Translates the app text from Greek
 * to English and the opposite.
 */
function changeLanguage() {
    if (lang === 'GR') {
        lang = 'ENG'
        $('#langBtn').text('Ελληνικά')
        $('#inputNote').attr('placeholder', 'Insert note')
    }
    else {
        lang = 'GR'
        $('#langBtn').text('English')
        $('#inputNote').attr('placeholder', 'Εισάγετε σημείωση')
    }
}

/**
 * Add a note in the notes area
 * and clean the input area.
 * 
 * @param {string} message 
 * @returns 
 */
function addNoteHandler(message) {
    if (!message) return

    insertNote(message)
    cleanInputNote()
}

/**
 * Insert a note in the notes area
 * and clean the input area.
 * 
 * @param {string} message 
 */
function insertNote(message) {
    noteId++

    let $noteCmp = $('#noteComponent')
    let $clonedCmp = $noteCmp.clone()    // without event handlers

    $clonedCmp.removeClass('d-none')

    $clonedCmp.find('#delNoteBtn').on('click', () => onDelBtnClicked($clonedCmp))
    $clonedCmp.find('#checkbox').on('click', () => onCheckBoxClicked($clonedCmp))

    // Update ids
    $clonedCmp.attr('id', 'noteComponent' + noteId)
    $clonedCmp.find('#checkbox').attr('id', 'checkbox' + noteId)
    $clonedCmp.find('#noteText').attr('for', 'checkbox' + noteId)
    $clonedCmp.find('#delNoteBtn').attr('id', 'delNoteBtn' + noteId)
    $clonedCmp.find('#noteText').html(message)


    $('#notesArea').append($clonedCmp)
}

/**
 * Remove text from the input form.
 */
function cleanInputNote() {
    $('#inputNote').val('')
}

/**
 * Removes a component
 * 
 * @param noteComponent the component to be deleted
 */
function deleteNoteComponent(noteComponent) {
    noteComponent.remove()
}

/**
 * Inserts a line-through and changes the color
 * of the text in the given labelNode. 
 * 
 * @param labelNode 
 */
function strikeThrough(labelNode) {
    labelNode.toggleClass('text-decoration-line-through text-muted')
}
