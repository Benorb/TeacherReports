// const delay = (data, millis = 100) =>
//     new Promise(resolve => setTimeout(() => resolve(data), 1000))

// const getTeachers =  () => delay(['Teacher 1', 'Teacher 2', 'Teacher 3']);
// const getCourses =  () => delay(['Course 1', 'Course 2', 'Course 3']);
// const getActivities =  () => delay(['Activity 1', 'Activity 2', 'Activity 3']);
// const getTasks =  () => delay(['Task 1', 'Task 2', 'Task 3']);
// const getReports =  () => delay(['Report 1', 'Report 2', 'Report 3']);

const api = (path, params) => $.get(`http://localhost:8090/reports/${path}`).then(
    function(res) {
        console.log(res)
        return res.rows
    }, function(err) {
        console.log(err)
    }
)
window.api = (path, params) => {
    return api(path, params);
};

// class api {
//
//     getTeachers() {
//         return delay(['Teacher 1', 'Teacher 2', 'Teacher 3']);
//     }
//
//     getCourses(teacherId) {
//         return delay(['Course 1', 'Course 2', 'Course 3']);
//     }
//
//     getActivities(courseId) {
//         return delay(['Activity 1', 'Activity 2', 'Activity 3']);
//     }
//
//     getTasks(activityId) {
//         return delay(['Task 1', 'Task 2', 'Task 3']);
//     }
//
//     getReports() {
//         return delay(['Report 1', 'Report 2', 'Report 3']);
//     }
// }


