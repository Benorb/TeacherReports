const api = (path, params) => $.get(`http://localhost:8090/reports/${path}`).then(
    function(res) {
        console.log(res)
        return res.rows
    }, function(err) {
        console.log(err)
    }
)
window.getTeacherCourses = (teacherId) => {
    return api(`teachers/${teacherId}/courses`);
};

window.getCourseActivities = (courseId) => {
    return api(`courses/${courseId}/activities`);
};

window.getActivityStages = (activityId) => {
    return api(`activities/${activityId}/stages`);
};

window.getReport = (reportName, teacherId, stageId) => {
    return api(`${reportName}/teachers/${teacherId}/stages/${stageId}`);
};

