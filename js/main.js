document.addEventListener("DOMContentLoaded", async () => {
    const getTeacherCourses = window.getTeacherCourses;
    const getCourseActivities = window.getCourseActivities;
    const getActivityStages = window.getActivityStages;
    const getReport = window.getReport;

    setSelect2()

    var gridOptions = {
        columnDefs: [],
        rowData: [],
        onGridReady: function (params) {
            params.api.sizeColumnsToFit();
        }
    };

    const queryParams = getUrlVars()
    console.log(queryParams)
    const teacherId = 2; //TODO: get from url

    initiallizeGrid(gridOptions)

    fillData(getTeacherCourses, 'coursesSelect', teacherId, 'Select Course');

    window.selectChange = async function selectChange(e) {
        var nextSelectId = null
        var getData = null
        var defaultText = 'Select Course'
        switch(e.id) {
            case 'coursesSelect': {
                nextSelectId = 'activitySelect'
                getData = getCourseActivities
                defaultText = 'Select Activity'
            }
            break;
            case 'activitySelect': {
                nextSelectId = 'stageSelect'
                getData = getActivityStages
                defaultText = 'Select Stage'
            }
            break;
        }

        if(nextSelectId) {
            const selects = $('.dynamicSelect').toArray()
            const selectedIndex = selects.findIndex((el) => el === e)
            $(`#${nextSelectId}`).prop('disabled', false);
            for (var i = selectedIndex+1; i < selects.length; i++) {
                if(i === selectedIndex+1){
                    fillData(getData, selects[i].id, e.value, defaultText)
                } else {
                    $(`#${selects[i].id}`).html('').prop('disabled', true);
                }
            }
        }
        checkData()
    }

    async function fillData(getData, selectId, entityId, defaultText){
        const data = await getData(entityId)
        $(`#${selectId}`).html('');
        if(data){
            $(`#${selectId}`).append('<option value="" disabled selected>' + defaultText + '</option>');
            data.forEach((value) => {
                $(`#${selectId}`).append('<option value="' + value.id + '">' + value.name + '</option>');
            });
        }
    }

    window.submit = async function submit() {
        const teacherId = 2;
        const stageId = $('#stageSelect').val();
        const reportName = $('#reportSelect').val();
        const data = await getReport(reportName, teacherId, stageId)
        if(data.length){
            $('#error').css("visibility", "hidden");
        } else {
            $('#error').css("visibility", "visible");
        }
        fillTable(data)
    }

    function initiallizeGrid(gridOptions){
        const eGridDiv = document.querySelector('#myGrid');
        new agGrid.Grid(eGridDiv, gridOptions);
    }

    function fillTable(data){
        var columnDefs = [];
        const uniqArr = _.uniqBy(data, 'description')
        if(uniqArr.length){
            columnDefs = [
                ...columnDefs,
                { headerName: 'User Name', field: 'user_name' }
            ]
        }
        var fieldNames = ['user_name']
        uniqArr.map(item => {
            fieldNames = [
                ...fieldNames,
                item.description
            ]
            return columnDefs = [
                ...columnDefs,
                {headerName: item.description, field: item.description}
            ];
        })

        var groupData = _.groupBy(data,'username')

        var rowData = []
        _.map(groupData, (items) => {
            let rowObj = {user_name: items[0].username}
            items.map((item) => {
                rowObj = {...rowObj, [item.description]: item.result || '-'}
            })
            rowData = [...rowData, rowObj]
        })
        gridOptions.api.setColumnDefs(columnDefs);
        gridOptions.api.setRowData(rowData);
        gridOptions.api.sizeColumnsToFit();
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    function setSelect2() {
        $('#reportSelect').select2({
            dropdownAutoWidth : true,
            // width: 'auto',
        })

        $('#coursesSelect').select2({
            dropdownAutoWidth : true,
            // width: 'auto',
            placeholder:'Select Course'
        })

        $('#activitySelect').select2({
            dropdownAutoWidth : true,
            // width: 'auto',
            placeholder:'Select Activity'
        })

        $('#stageSelect').select2({
            dropdownAutoWidth : true,
            // width: 'auto',
            placeholder:'Select Stage'
        })
    }

    function checkData() {
        if($('#coursesSelect').val() && $('#activitySelect').val() && $('#stageSelect').val()){
            $("#submit").prop('disabled', false).removeClass('disabled').addClass('enabled');
        } else {
            $("#submit").prop('disabled', true).removeClass('enabled').addClass('disabled');
        }
    }
})

