
function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

function writeToDocument(url) {
    
    // create empty array to hold our rows of data
    var tableRows = [];
    
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(url, function(data) {
        var pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        
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

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}