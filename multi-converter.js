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
    element.setSelectionRange(0, 9999999); // For mobile devices
    document.execCommand('copy');
}

function clearData() {
    const elementsToClear = [
        'ids', 'commaSeparated', 'singleQuotes', 'countInput',
        'commaRemoved', 'epochTime', 'result'
    ];
    // Clear the value of each input element except the dropdowns
    elementsToClear.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            if (element.tagName.toLowerCase() !== 'select') {
                element.value = '';  // Clear the value for text/number inputs
            }
            element.innerHTML = ''; // Clear the inner HTML for divs like 'result'
        }
    });
    // Reset the hours and minutes dropdowns to '0' by setting selectedIndex
    const hoursDropdown = document.getElementById('hours');
    const minutesDropdown = document.getElementById('minutes');    
    if (hoursDropdown) {
        hoursDropdown.selectedIndex = 0;  // Reset to first option (0)
    }    
    if (minutesDropdown) {
        minutesDropdown.selectedIndex = 0;  // Reset to first option (0)
    }
    // Clear the inner text of specific display elements
    document.getElementById('countDisplay').innerText = '';
    document.getElementById('withoutSpaceCountDisplay').innerText = '';
    document.getElementById('wordCountDisplay').innerText = '';   
    // Hide the comma removed container
    document.getElementById('commaRemovedContainer').style.display = 'none';    
    // Reset the select element to its default option
    document.getElementById('timezoneSelect').selectedIndex = 0; 
    // Clear the 'results' section
    document.getElementById('minutesToSubtract').value = '';
    document.getElementById('oldEpochTime').innerText = '';
    document.getElementById('newEpochTime').innerText = '';
    document.getElementById('timeDiff').innerText = '';
    document.getElementById('results').style.display = 'none'; // Optionally hide the section
    document.getElementById('hf-result').innerText = ''; // Clear the Human Date result
    document.getElementById('result2').innerText = '';
    // Clear all input type number fields
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => input.value = ''); // Clear all number inputs
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

//Count as words
function countWords() {
    const input = document.getElementById('countInput').value;
    const wordsArray = input.trim().split(/[\s,]+/); // Splits by space or comma, and ignores multiple spaces/commas
    const wordCount = wordsArray.filter(word => word.length > 0).length; // Filters out empty elements
    document.getElementById('wordCountDisplay').innerText = `Word Count: ${wordCount}`;
}

function resizeInput(input) {
    input.style.width = 'auto';
    input.style.width = (input.scrollWidth + 10) + 'px';
}

function removeCommaData() {
    const inputData = document.getElementById('ids').value;
    const dataWithoutComma = inputData.replace(/,/g, ' ');
    document.getElementById('commaRemoved').value = dataWithoutComma;
    document.getElementById('commaRemovedContainer').style.display = 'flex';
}

function removeDuplicates() {
    const inputData = document.getElementById('ids').value.trim().split(/\s+/);
    const uniqueData = [...new Set(inputData)].join(' ');
    document.getElementById('commaRemoved').value = uniqueData;
    document.getElementById('commaRemovedContainer').style.display = 'flex';
}

function refreshPage() {
    location.reload();
}

// Hex/Text Converter functions
function convertToHex() {
    const text = document.getElementById('textInput').value;
    const hex = Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('').toUpperCase();
    document.getElementById('hexOutput').value = hex;
}

function convertToText() {
    const hex = document.getElementById('hexOutput').value;
    const text = hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    document.getElementById('textOutput').value = text;
}

function clearFields() {
    const elementsToClear = [
        'textInput', 'hexOutput', 'numberInput',
        'binaryOutput', 'textOutput', 'base64Output', 'apiKeyOutput'
    ];
    elementsToClear.forEach(id => document.getElementById(id).value = '');
}

// Navigation
document.getElementById('sqlConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'block';
    document.getElementById('hexConverter').style.display = 'none';
    document.getElementById('xmlToBlockSection').style.display = 'none';
    document.getElementById('queryToJsonSection').style.display = 'none';
});

document.getElementById('hexConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'block';
    document.getElementById('xmlToBlockSection').style.display = 'none';
    document.getElementById('queryToJsonSection').style.display = 'none';
});

// New Tools
document.getElementById('xmlToBlockLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'none';
    document.getElementById('xmlToBlockSection').style.display = 'block';
    document.getElementById('queryToJsonSection').style.display = 'none';
});

document.getElementById('queryToJsonLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'none';
    document.getElementById('xmlToBlockSection').style.display = 'none';
    document.getElementById('queryToJsonSection').style.display = 'block';
});

// Function to convert number to binary
function convertToBinary() {
    const numberInput = document.getElementById('numberInput').value.trim();
    const binaryOutput = document.getElementById('binaryOutput');

    if (!isNaN(numberInput) && numberInput !== '') {
        binaryOutput.value = Number(numberInput).toString(2);
    } else if (/^[0-9a-fA-F]+$/.test(numberInput)) {
        binaryOutput.value = parseInt(numberInput, 16).toString(2);
    } else {
        binaryOutput.value = 'Invalid input';
    }
}

// Function to update the current epoch time
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

// Visit Counter
function updateVisitCounter() {
  const currentYear = new Date().getFullYear();
  let visitCount = localStorage.getItem('visitCount');
  let storedYear = localStorage.getItem('visitYear');

  if (!visitCount || storedYear == null || currentYear !== parseInt(storedYear)) {
    visitCount = 0;
    storedYear = currentYear;
  } else {
    visitCount = parseInt(visitCount);
  }
  visitCount++;
  localStorage.setItem('visitCount', visitCount);
  localStorage.setItem('visitYear', currentYear);

  document.getElementById('visit-counter').innerText = `Visit count: ${visitCount}`;
}
// Call the function to update and display the visit counter
updateVisitCounter();

// Base64 Converter functions
function encodeToBase64() {
    const data = document.getElementById('numberInput').value;
    const encoded = btoa(data);
    document.getElementById('base64Output').value = "Basic " + encoded;
}

// Function to convert the entered epoch time to GMT, local time, and calculate relative time
function convertEpochTime() {
    const epochInput = document.getElementById('epochTime').value;
    const timeFormat = document.getElementById('timeFormat').value;
    const epochTime = parseInt(epochInput, 10);
    const timezoneSelect = document.getElementById('timezoneSelect').value;
    const dstOption = document.getElementById('dstSelect')?.value; // Optional DST dropdown

    if (!isNaN(epochTime)) {
        const baseDate = new Date(timeFormat === 'milliseconds' ? epochTime : epochTime * 1000);
        const gmtFormattedDate = baseDate.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
        const relativeTime = calculateRelativeTime(baseDate);

        // Adjust time for DST
        let dstMs = 0;
        if (dstOption === 'spring') {
            dstMs = -3600000; // Subtract 1 hour
        } else if (dstOption === 'fall') {
            dstMs = 3600000; // Add 1 hour
        }

        // IST, EST, SAST with DST adjustment
        const istDate = new Date(baseDate.getTime() + dstMs);
        const estDate = new Date(baseDate.getTime() + dstMs);
        const sastDate = new Date(baseDate.getTime() + dstMs);

        const istTime = new Date(istDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        const estTime = new Date(estDate.toLocaleString('en-US', { timeZone: 'America/New_York' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        const utcTime = new Date(baseDate.toLocaleString('en-US', { timeZone: 'UTC' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        const sastTime = new Date(sastDate.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        let resultText = `GMT: ${gmtFormattedDate}<br>Relative: ${relativeTime}<br>`;
        resultText += `IST: ${istTime} | EST/EDT: ${estTime} | UTC: ${utcTime} | SAST: ${sastTime}`;

        if (timezoneSelect) {
            const timezoneOffset = parseTimezoneOffset(timezoneSelect);
            const localDate = new Date(baseDate.getTime() + timezoneOffset * 60000 + dstMs);
            const localFormattedDate = localDate.toISOString().replace('T', ' ').slice(0, 19);
            resultText += `<br>Local Time: ${localFormattedDate} ${timezoneSelect}`;
        } else {
            resultText += `<br>Local Time: Please select a timezone.`;
        }

        document.getElementById('result').innerHTML = resultText;
    } else {
        document.getElementById('result').innerText = 'Invalid epoch time. Please enter a valid number.';
    }
}


function calculateRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffMs > 0) {
        return diffDays > 0 ? `${diffDays} day(s) ago` :
               diffHr > 0 ? `${diffHr} hour(s) ago` :
               diffMin > 0 ? `${diffMin} minute(s) ago` :
               `${diffSec} second(s) ago`;
    } else {
        return 'In the future';
    }
}

function parseTimezoneOffset(timezone) {
    const match = timezone.match(/([+-])(\d{2}):(\d{2})/);
    if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);
        return sign * (hours * 60 + minutes);
    }
    return 0;
}

// Updated Function to Calculate Relative Time with Days Converted to Years
function calculateRelativeTime(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((date - now) / 1000);
    const absDiffInSeconds = Math.abs(diffInSeconds);
    const absDiffInDays = Math.floor(absDiffInSeconds / 86400);

    // Helper function to format days into years if needed
    function formatDaysToYears(days) {
        if (days > 365) {
            const years = Math.floor(days / 365);
            const remainingDays = days % 365;
            return `${days} days | ${years} year${years > 1 ? 's' : ''}${remainingDays > 0 ? ' and ' + remainingDays + ' day' + (remainingDays > 1 ? 's' : '') : ''}`;
        }
        return `${days} day${days > 1 ? 's' : ''}`;
    }

    if (diffInSeconds < 0) { // Past dates
        if (absDiffInSeconds < 60) {
            return 'A few seconds ago';
        } else if (absDiffInSeconds < 3600) {
            const minutes = Math.floor(absDiffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (absDiffInSeconds < 86400 && absDiffInSeconds >= 82800) { // Close to a day
            return 'A day ago';
        } else if (absDiffInSeconds < 86400) {
            const hours = Math.floor(absDiffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            // Return days and years if applicable
            return `${formatDaysToYears(absDiffInDays)} ago`;
        }
    } else { // Future dates
        if (absDiffInSeconds < 60) {
            return 'In a few seconds';
        } else if (absDiffInSeconds < 3600) {
            const minutes = Math.floor(absDiffInSeconds / 60);
            return `In ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (absDiffInSeconds < 86400 && absDiffInSeconds >= 82800) {
            return 'In a day';
        } else if (absDiffInSeconds < 86400) {
            const hours = Math.floor(absDiffInSeconds / 3600);
            return `In ${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            // Return days and years if applicable
            return `In ${formatDaysToYears(absDiffInDays)}`;
        }
    }
}

// Example helper function to parse timezone offsets (update according to your needs)
function parseTimezoneOffset(offset) {
    // Simple parsing of timezone offset string like "+05:30" or "-03:00"
    const sign = offset.startsWith('-') ? -1 : 1;
    const [hours, minutes] = offset.replace(/[+-]/, '').split(':').map(Number);
    return sign * (hours * 60 + minutes);
}

// Initialize the conversion when the page loads
window.onload = function() {
    document.getElementById('timezoneSelect').addEventListener('change', convertEpochTime);
};

// Function for Block Conversion
function convertToBlock() {
    const fullXmlTextarea = document.getElementById('fullXml');
    const blockXmlTextarea = document.getElementById('blockXml');
    const errorMsg = document.getElementById('errorMsg');

    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(fullXmlTextarea.value, "text/xml");

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            throw new Error("Error parsing XML. Please check your XML structure.");
        }
        // Extract the BlockNumber value separately
        const blockNumberElement = xmlDoc.querySelector('BlockNumber');
        const blockNumber = blockNumberElement ? blockNumberElement.textContent.trim() : '';

        // Recursive function to extract all text content except <BlockNumber>
        function extractTextContent(node) {
            let textContent = '';

            if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'BlockNumber') {
                for (let i = 0; i < node.childNodes.length; i++) {
                    textContent += extractTextContent(node.childNodes[i]);
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                const trimmedValue = node.nodeValue.trim();
                if (trimmedValue) {
                    textContent += trimmedValue + ',';
                }
            }
            return textContent;
        }
        // Extract text content and remove the trailing comma
        let blockXml = extractTextContent(xmlDoc.documentElement).slice(0, -1);

        // Output BlockNumber and BlockData separately
        blockXmlTextarea.value = `<BlockNumber>${blockNumber}</BlockNumber>\n<BlockData>${blockXml}</BlockData>`;
        errorMsg.textContent = '';
    } catch (error) {
        // Display the error message in red and bold
        errorMsg.textContent = error.message;
        errorMsg.style.color = "red"; // Set text color to red
        errorMsg.style.fontWeight = "bold"; // Set font to bold
        highlightErrorLine(fullXmlTextarea, error.message);
    }
}

//Function for Json conversion
function convertToJson() {
    const queryStringTextarea = document.getElementById('queryString');
    const jsonOutputTextarea = document.getElementById('jsonOutput');
    const errorMsg = document.getElementById('jsonErrorMsg');
    const queryString = queryStringTextarea.value.trim();

    try {
        const params = new URLSearchParams(queryString);
        const jsonObject = {};
        for (const [key, value] of params.entries()) {
            jsonObject[key] = value;
        }

        jsonOutputTextarea.value = JSON.stringify(jsonObject, null, 2);
        errorMsg.textContent = '';
    } catch (error) {
        errorMsg.textContent = "Error converting query string to JSON. Please check your input.";
    }
}

function clearText(inputId, outputId, errorId) {
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).value = '';
    document.getElementById(errorId).textContent = '';
}

function highlightErrorLine(textarea, errorMessage) {
    textarea.classList.add('error-highlight');
    // You can add more logic to find the exact line with the error if needed
}

// Add event listener to all elements with the class 'pasteable'
document.querySelectorAll('.pasteable').forEach(function(textbox) {
    textbox.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default context menu from appearing
        navigator.clipboard.readText().then(function(text) {
            // Insert the copied text into the clicked textbox
            event.target.value = text;
        }).catch(function(err) {
            console.error('Failed to read clipboard contents: ', err);
        });
    });
});

function calculateNewEpochTime() {
    const epochTimeInput = document.getElementById('epochTime');
    const minutesToSubtractInput = document.getElementById('minutesToSubtract');
    const epochTime = parseInt(epochTimeInput.value);
    const minutesToSubtract = parseInt(minutesToSubtractInput.value);

    if (isNaN(epochTime) || isNaN(minutesToSubtract)) {
        alert("Please enter valid data for both textboxes.");
        return;
    }
    // Convert epoch time to JavaScript date
    const date = new Date(epochTime * 1000);
    // Subtract the minutes
    date.setMinutes(date.getMinutes() - minutesToSubtract);
    // Convert back to epoch time
    const newEpochTime = Math.floor(date.getTime() / 1000);

    // Display results
    document.getElementById('oldEpochTime').innerText = epochTime;
    document.getElementById('newEpochTime').innerText = newEpochTime;
    document.getElementById('timeDiff').innerText = minutesToSubtract;
    document.getElementById('results').style.display = 'block';
}

// Function to clear results on page load
function clearResultsOnPageLoad() {
    document.getElementById('results').style.display = 'none'; // Hide the results section
    document.getElementById('oldEpochTime').innerText = '';
    document.getElementById('newEpochTime').innerText = '';
    document.getElementById('timeDiff').innerText = '';
}
// Call this function when the page loads
window.onload = clearResultsOnPageLoad;

   // Function to convert Human date to Epoch time
function HumanToEpochTZ() {
    // Prevent the form from clearing inputs by stopping default behavior
    event.preventDefault();

    const form = document.getElementById('hf');
    const year = parseInt(form.yyyy.value, 10);
    const month = parseInt(form.mm.value, 10) - 1; // JavaScript months are 0-based
    const day = parseInt(form.dd.value, 10);
    const hour = parseInt(form.hh.value, 10);
    const minute = parseInt(form.mn.value, 10);
    const second = parseInt(form.ss.value, 10);
    const timezone = parseInt(form.tz.value, 10);  // This now can be 0 (GMT) or 330 (IST)

     // Check if any input is invalid (NaN or out of valid ranges)
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second) || isNaN(timezone)) {
        document.getElementById('hf-result').textContent = 'Enter valid data to the textboxes.';
        return;
    }

    // Create a date object using the provided values
    const date = new Date(Date.UTC(year, month, day, hour, minute, second));

    // Adjust for the selected timezone offset (in minutes)
    const epochTime = Math.floor(date.getTime() / 1000) - (timezone * 60);

    // Display the calculated epoch time
    document.getElementById('hf-result').textContent = `Epoch Time: ${epochTime}`;
}

 // Function to convert Epoch time to Human-readable date
function EpochToHumanTZ() {
    const epochInput = parseInt(document.getElementById('epochInput').value, 10);
    const timezoneSelect = parseInt(document.getElementById('timezoneSelect').value, 10); // Can be 0 (GMT) or 330 (IST)

    // Check if the input is valid
    if (isNaN(epochInput)) {
        document.getElementById('et-result').textContent = 'Invalid epoch time';
        return;
    }

    // Create date from epoch time
    const date = new Date(epochInput * 1000);

    // Adjust for the selected timezone offset (in minutes)
    date.setMinutes(date.getMinutes() + timezoneSelect);

    // Format the result as a human-readable date
    const formattedDate = date.toUTCString();

    // Display the formatted date
    document.getElementById('et-result').textContent = `Human Date: ${formattedDate}`;
}

        // Function to clear results on page load
        function clearResultsOnPageLoad() {
         document.getElementById('results').style.display = 'none'; // Hide the results section
         document.getElementById('oldEpochTime').innerText = '';
         document.getElementById('newEpochTime').innerText = '';
         document.getElementById('timeDiff').innerText = '';
}
        // Call this function when the page loads
        window.onload = clearResultsOnPageLoad;

    //Different timezones 
document.addEventListener('DOMContentLoaded', function () {
    // Function to update time for all timezones
    function updateTime() {
        try {
            // Fetching current time for each timezone
            const istTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const estTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const utcTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const sastTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Africa/Johannesburg',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            // Displaying the time for each timezone
            document.getElementById('istTime').textContent = istTime;
            document.getElementById('estTime').textContent = estTime;
            document.getElementById('utcTime').textContent = utcTime;
            document.getElementById('sastTime').textContent = sastTime;
        } catch (error) {
            console.error("Error updating time zones:", error);
        }
    }

    // Updating the time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display time immediately
});

// Function to generate a cryptographically secure random API key
function generateApiKey() {
    const length = 32; // Length of the API key
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';    
    // Create a secure random array of bytes
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    // Generate the API key by mapping the random byte values to the character set
    let apiKey = '';
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(randomValues[i] % characters.length); // Map to valid character
    }
    // Display the generated API key in the designated input field
    document.getElementById('apiKeyOutput').value = apiKey;
}

// Select all anchor tags within the <nav> element
const navLinks = document.querySelectorAll("nav a");
// Add a click event listener to each link
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove("active"));
        // Add 'active' class to the clicked link
        this.classList.add("active");
    });
});

// Minutes to Seconds 
function calculateSeconds() {
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    // Convert time to total seconds
    const totalSeconds = (hours * 3600) + (minutes * 60);
    // Display the result
    document.getElementById('result2').innerText = `Total time: ${totalSeconds} seconds`;
  }

//Generating values for Hours and Minutes
const hoursSelect = document.getElementById('hours');
// Generate options for hours (0 to 12)
for (let i = 0; i <= 23; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    hoursSelect.appendChild(option);
}

const minutesSelect = document.getElementById('minutes');
// Generate options for minutes (0 to 59)
for (let i = 0; i <= 59; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    minutesSelect.appendChild(option);
}

// Timezone data: [Offset value, GMT representation, Offset in seconds]
const timezones = [
    ["-12:00", "GMT-12:00", -43200],
    ["-11:00", "GMT-11:00", -39600],
    ["-10:00", "GMT-10:00", -36000],
    ["-09:30", "GMT-09:30", -34200],
    ["-09:00", "GMT-09:00", -32400],
    ["-08:00", "GMT-08:00", -28800],
    ["-07:00", "GMT-07:00", -25200],
    ["-06:00", "GMT-06:00", -21600],
    ["-05:00", "GMT-05:00", -18000],
    ["-04:00", "GMT-04:00", -14400],
    ["-03:30", "GMT-03:30", -12600],
    ["-03:00", "GMT-03:00", -10800],
    ["-02:00", "GMT-02:00", -7200],
    ["-01:00", "GMT-01:00", -3600],
    ["+00:00", "GMT+00:00", 0],
    ["+01:00", "GMT+01:00", 3600],
    ["+02:00", "GMT+02:00", 7200],
    ["+03:00", "GMT+03:00", 10800],
    ["+03:30", "GMT+03:30", 12600],
    ["+04:00", "GMT+04:00", 14400],
    ["+04:30", "GMT+04:30", 16200],
    ["+05:00", "GMT+05:00", 18000],
    ["+05:30", "GMT+05:30", 19800],
    ["+06:00", "GMT+06:00", 21600],
    ["+06:30", "GMT+06:30", 23400],
    ["+07:00", "GMT+07:00", 25200],
    ["+08:00", "GMT+08:00", 28800],
    ["+08:30", "GMT+08:30", 30600],
    ["+09:00", "GMT+09:00", 32400],
    ["+09:30", "GMT+09:30", 34200],
    ["+10:00", "GMT+10:00", 36000],
    ["+10:30", "GMT+10:30", 37800],
    ["+11:00", "GMT+11:00", 39600],
    ["+12:00", "GMT+12:00", 43200]
];
const timezoneSelect = document.getElementById('timezoneSelect');
// Iterate through the timezone array and create <option> elements
timezones.forEach(([value, label, offset]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = `${label} (${offset})`;
    timezoneSelect.appendChild(option);
});

