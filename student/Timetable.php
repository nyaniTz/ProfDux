<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Student</title>
        <page data-id="Timetable"></page> 

        <?php include '../include/studentImports.php'; ?>
        <link rel="stylesheet" href="../css/timetable.css?2">

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <h1 class="large-title">
                    Timetable
                </h1>
                <div class="timetable-container">

                </div>
            </div>
        </div>

        <script>

            const id = "ef87w9r42rbw";

            ( async () => {

                try {
                    
                    let result = await AJAXCall({
                        phpFilePath: "../include/schedule/getTimetable.php",
                        rejectMessage: "Getting Timetable Failed",
                        params: `id=${id}`,
                        type: "fetch"
                    });

                    const timetableContainer = document.querySelector(".timetable-container");

                    const timetable = new Timetable(result);
                    timetable.setTimetableContainer(timetableContainer);

                    timetable.render();

                    console.log(result);

                }catch(error){
                    console.log(error)
                }

            })()

            class Timetable{

                timeObject
                thisWeek = []

                constructor(timeObject){
                    this.timeObject = timeObject;
                    this.sort();
                }

                setTimetableContainer(element){
                    this.timetableContainer = element;
                }

                sort(timeObject){

                    this.timeObject.forEach( row => {
                        // Append course details ...

                        console.log("row", row);

                        const metadata = {
                            courseID: row.id,
                            courseCode: row.courseCode,
                            courseTitle: row.title,
                            courseImage: row.image,
                            courseInstructor: row.courseInstructor,
                        }

                        this.thisWeek = [ ...this.thisWeek, ...filterLecturesWithinRange(row.lectures, metadata)];
                        console.log("thisWeek: ", this.thisWeek);
                    });

                    function filterLecturesWithinRange(lectures, metadata){

                        let lecturesWithinRange = [];

                        lectures.forEach( lecture => {
                            if(lecture.time != null){
                                const result = isNowWithinThisWeek(new Date(lecture.time.timeStart));
                                // console.log("lecture: ", lecture);
                                // console.log("result: ", lecture.time.timeStart, result);
                                if (result == true){
                                    lecturesWithinRange.push({
                                        ...lecture, ...metadata
                                    })
                                }
                            }
                        })

                        return lecturesWithinRange;

                    }
                    
                }

                render(){

                    const innerTimetableContainerForThisWeek = document.createElement("div");
                    innerTimetableContainerForThisWeek.className = "inner-timetable-container";

                    // TODO: headers

                    this.thisWeek.forEach( row => {
                        const rowElement = this.createTimetableRow(row);
                        innerTimetableContainerForThisWeek.appendChild(rowElement);
                    });

                    // const innerTimetableContainerForNextWeek = document.createElement("div");
                    // innerTimetableContainerForNextWeek.className = "inner-timetable-container";

                    // // TODO: headers

                    // this.nextWeek.forEach( row => {
                    //     const rowElement = this.createTimetableRow(row);
                    //     innerTimetableContainerForNextWeek.appendChild(rowElement);
                    // });

                    this.timetableContainer.append(innerTimetableContainerForThisWeek);
                    // this.timetableContainer.append(innerTimetableContainerForNextWeek);
                }

                createTimetableRow(rowObject){

                    const timetableRow = document.createElement("div");
                    timetableRow.className = "timetable-row";

                    const courseImageContainer = document.createElement("div");
                    courseImageContainer.className = "course-image";

                    const courseImage = document.createElement("img");
                    courseImage.src = "../uploads/" + rowObject.courseImage;

                    const timetableRowDetails = document.createElement("div");
                    timetableRowDetails.className = "timetable-row-details";

                    const courseCode = document.createElement("h4");
                    courseCode.className = "course-code";
                    courseCode.textContent = rowObject.courseCode;

                    const courseTitle = document.createElement("div");
                    courseTitle.className = "course-title";
                    courseTitle.textContent = "Lecture: " + rowObject.title;

                    const courseInstructor = document.createElement("div");
                    courseInstructor.className = "course-instructor";
                    courseInstructor.textContent = "Instructor: " + rowObject.courseInstructor;

                    const courseTime = document.createElement("div");
                    courseTime.className = "course-time";
                    courseTime.textContent = rowObject.time.timeStart;
                    //TODO: Format time and make it more human friendly 

                    timetableRowDetails.append(courseCode);
                    timetableRowDetails.append(courseTitle);
                    timetableRowDetails.append(courseInstructor);
                    timetableRowDetails.append(courseTime);

                    courseImageContainer.appendChild(courseImage);
                    timetableRow.append(courseImageContainer)
                    timetableRow.append(timetableRowDetails)

                    return timetableRow;

                }

            }

            function isNowWithinThisWeek(givenDate) {

                if(givenDate == null) return false;

                const now = new Date();
                const startOfWeek = new Date(now);
                const endOfWeek = new Date(now);

                // Set startOfWeek to the previous Sunday (start of the week)
                startOfWeek.setDate(now.getDate() - now.getDay());

                // Set endOfWeek to the next Saturday (end of the week)
                endOfWeek.setDate(now.getDate() + (7 - now.getDay()));

                // Set times to start and end of days
                startOfWeek.setHours(0, 0, 0, 0);
                endOfWeek.setHours(23, 59, 59, 999);

                return givenDate >= startOfWeek && givenDate <= endOfWeek;
            }
        </script>
    </body>
</html>
