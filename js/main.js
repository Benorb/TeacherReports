// specify the columns
var columnDefs = [
    {headerName: "Make", field: "make"},
    {headerName: "Model", field: "model"},
    {headerName: "Price", field: "price"}
];

// specify the data
var rowData = [
    {make: "Toyota", model: "Celica", price: 35000},
    {make: "Ford", model: "Mondeo", price: 32000},
    {make: "Porsche", model: "Boxter", price: 72000}
];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    onGridReady: function (params) {
        params.api.sizeColumnsToFit();
    }
};

$(document).ready(function() {
    $('.detailsDropdown').select2();
});

document.addEventListener("DOMContentLoaded", function() {

    var app = new Vue({
        el: '#app',
        data: {
            details: {
                // teacherName: 'Avi Sasson',
                course: ['Biology', 'Sport'],
                activity: ['Running', 'Testing'],
                task: ['Exam', 'Work'],
                report: ['Report 1', 'Report2']
            }
        }
    })

    // lookup the container we want the Grid to use
    var eGridDiv = document.querySelector('#myGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);

});


