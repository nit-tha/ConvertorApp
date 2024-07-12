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
}
