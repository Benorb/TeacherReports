const _api = window.api;

// specify the columns
var columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
];

// specify the data
var rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 }
];

// let the grid know which columns and what data to use
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    onGridReady: function (params) {
        params.api.sizeColumnsToFit();
    }
};

$(document).ready(function () {
    $('.detailsDropdown').select2();
});



document.addEventListener("DOMContentLoaded", async () => {
    let vm = new Vue({
        el: '#app',
        data: {
            details: {
                teacher: [],
                course: [],
                activity: [],
                task: [],
                report: [],
            }
        },
        methods: {
            fetchCourses: async (event) => {
                const courses = await _api.getCourses();
                vm.details.course = courses;
            },
            fetchActivities: async (event) => {
                const activities = await _api.getActivities();
                vm.details.course = activities;
            },
            fetchTasks: async (event) => {
                const tasks = await _api.getTasks();
                vm.details.course = tasks;
            },
            onSelectChange: async () => {
                console.log(123)
            },
            chooseClicked: async () => {
                console.log(123123123123)
            }
        },

    });


    // lookup the container we want the Grid to use
    const eGridDiv = document.querySelector('#myGrid');

    // create the grid passing in the div to use together with the columns & data we want to use
    new agGrid.Grid(eGridDiv, gridOptions);


    const teachers = await _api.getTeachers();
    const reports = await _api.getReports();
    vm.details.teacher = teachers;
    vm.details.report = reports;


});


