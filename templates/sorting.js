function sortCourses(course){

    course.lectures.sort((firstLecture, secondLecture) => {

        firstLecture.subtopics.sort((firstSubtopic, secondSubtopic) =>
            firstSubtopic.hierarchy - secondSubtopic.hierarchy
        );

        return firstLecture.hierarchy - secondLecture.hierarchy
    });

}

let course = {
    title: "Hello",
    lectures: [
        {
            title: "My Lecture2",
            hierarchy: 2,
            subtopics: [
                { 
                    title: "poof",
                    hierarchy: 9,
                },
                { 
                    title: "welp",
                    hierarchy: 3,
                }

            ]
        },
        {
            title: "My Lecture1",
            hierarchy: 1,
            subtopics: [
                { 
                    title: "meow",
                    hierarchy: 2,
                },
                { 
                    title: "welp",
                    hierarchy: 4,
                },
                { 
                    title: "poof",
                    hierarchy: 9,
                },
                { 
                    title: "welp",
                    hierarchy: 1,
                }
            ]
        }
    ]
}

let result = sortCourses(course);

console.log(course.lectures[0].subtopics)