// SQL Converter functions
function convertToCommaSeparated() {
    const ids = document.getElementById('ids').value.trim().split(/\s+/).join(',');
    document.getElementById('commaSeparated').value = ids;
}

function convertToSingleQuotes() {
    const idsArray = document.getElementById('ids').value.trim().split(/\s+/);
    const singleQuotedIds = idsArray.map(id => `'${id}'`).join(',');
    document.getElementById('singleQuotes').value = singleQuotedIds;
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    element.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
}

function clearData() {
    document.getElementById('ids').value = '';
    document.getElementById('commaSeparated').value = '';
    document.getElementById('singleQuotes').value = '';
    document.getElementById('countInput').value = '';
    document.getElementById('countDisplay').innerText = '';
    document.getElementById('withoutSpaceCountDisplay').innerText = '';
    document.getElementById('commaRemoved').value = '';
    document.getElementById('commaRemovedContainer').style.display = 'none';
}

function countData() {
    const input = document.getElementById('countInput').value;
    const count = input.length; // Counts all characters including whitespaces
    document.getElementById('countDisplay').innerText = `Count: ${count}`;
}

function countExcludingSpace() {
    const input = document.getElementById('countInput').value;
    const withoutSpaceCount = input.replace(/\s/g, '').length; // Removes all whitespace and counts remaining characters
    document.getElementById('withoutSpaceCountDisplay').innerText = `Ex-space Count: ${withoutSpaceCount}`;
}

function resizeInput(input) {
    // Reset input size to auto to calculate width based on content length
    input.style.width = 'auto';
    // Set the width of the input based on the content length
    input.style.width = (input.scrollWidth + 10) + 'px';
}

function removeCommaData() {
    const inputData = document.getElementById('ids').value;
    const dataWithoutComma = inputData.replace(/,/g, ' ');
    document.getElementById('commaRemoved').value = dataWithoutComma;
    document.getElementById('commaRemovedContainer').style.display = 'flex';
}

function refreshPage() {
    location.reload();
}

// Hex/Text Converter functions
function convertToHex() {
    const text = document.getElementById('textInput').value;
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    document.getElementById('hexOutput').value = hex.toUpperCase();
}

function convertToText() {
    const hex = document.getElementById('hexOutput').value;
    let text = '';
    for (let i = 0; i < hex.length; i += 2) {
        text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    document.getElementById('textOutput').value = text;
}

function clearFields() {
    document.getElementById('textInput').value = '';
    document.getElementById('hexOutput').value = '';
    document.getElementById('numberInput').value = '';
    document.getElementById('binaryOutput').value = '';
    document.getElementById('textOutput').value = '';
}

// Navigation
document.getElementById('sqlConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'block';
    document.getElementById('hexConverter').style.display = 'none';
});

document.getElementById('hexConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'block';
});

// Function to convert number to binary
function convertToBinary() {
    var numberInput = document.getElementById('numberInput').value;
    var binaryOutput = document.getElementById('binaryOutput');

    // Check if the input is a valid number
    if (!isNaN(numberInput) && numberInput !== '') {
        var binary = Number(numberInput).toString(2); // Convert to binary string
        binaryOutput.value = binary; // Display binary output
    } else {
        binaryOutput.value = 'Invalid input'; // Handle invalid input
    }
}
//Function to update epoch time
function updateCurrentEpoch() {
    const currentEpochTime = Math.floor(Date.now() / 1000);
    document.getElementById('ecclock').textContent = currentEpochTime;
}
// Update the current epoch time every second
setInterval(updateCurrentEpoch, 1000);
// Initialize the current epoch time
updateCurrentEpoch();


// Function to copy the epoch timestamp to clipboard
function copyEpoch() {
    const epochText = document.getElementById('ecclock').textContent;
    navigator.clipboard.writeText(epochText).catch(err => {
        console.error('Failed to copy epoch time: ', err);
    });
}
