const baseURL = "https://swapi.co/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    
    // create empty array to hold our rows of data
    var tableRows = [];
    
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            // create empty array for each row
            var dataRow = [];
            
            Object.keys(item).forEach(function(key) {
                
                // create var to make items into strings
                var rowData = item[key].toString();
                
                // turn that data into a smaller substring for visual clarity
                var truncatedData = rowData.substring(0, 15);
                
                // then push this truncated data into their table cells
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}