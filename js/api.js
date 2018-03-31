class api {

    getTeachers() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['Teacher 1', 'Teacher 2', 'Teacher 3']);
            }, 1000);
        });
    }

    getCourses(teacherId) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['Course 1', 'Course 2', 'Course 3']);
            }, 1000);
        });
    }

    getActivities(courseId) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['Activity 1', 'Activity 2', 'Activity 3']);
            }, 1000);
        });
    }

    getTasks(activityId) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['Task 1', 'Task 2', 'Task 3']);
            }, 1000);
        });
    }

    getReports() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(['Report 1', 'Report 2', 'Report 3']);
            }, 1000);
        });
    }


}

window.api = new api('test');
