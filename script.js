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
