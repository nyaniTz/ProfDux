async function loadCoursesForExam(options = "id") {
  let courseViewContainer = document.querySelector(".course-view-container");
  let loader = courseViewContainer.querySelector(
    ".course-view-container-loader"
  );

  let noCoursesYetText = createLocalizedTextElement("No courses yet");
  let createCourseText = createLocalizedTextElement("Create Course");
  let errorText = createLocalizedTextElement("Something Went Wrong");

  let emptyView = createElement("div", "container-message");
  let largeMessage = createElement("div", "large-message");
  largeMessage.appendChild(noCoursesYetText);

  let createCourseButton = createElement("div", "button");
  createCourseButton.appendChild(createCourseText);
  createCourseButton.addEventListener("click", () => openCreateCourseOverlay());

  emptyView.appendChild(largeMessage);
  emptyView.appendChild(createCourseButton);

  let errorView = createElement("div", "container-message");
  largeMessage.innerHTML = "";
  largeMessage.appendChild(errorText);
  errorView.appendChild(largeMessage);

  /* STUDENT VIEW */
  let studentEmptyView = createElement("div", "container-message");
  let NoCoursesYet = createLocalizedTextElement("No Courses Yet");
  let studentlargeMessage = createElement("div", "large-message");
  studentlargeMessage.appendChild(NoCoursesYet);
  studentEmptyView.appendChild(studentlargeMessage);

  let myEmptyView = createElement("div", "container-message");
  let NoSelectedCoursesYet = createLocalizedTextElement(
    "You haven't chosen any courses yet"
  );
  let myLargeMessage = createElement("div", "large-message");
  myLargeMessage.appendChild(NoSelectedCoursesYet);
  myEmptyView.appendChild(myLargeMessage);

  return new Promise(async (resolve, reject) => {
    let { id: userID } = await getGlobalDetails();

    try {
      const params = `id=${userID}`;

      let phpFilePath;

      switch (options) {
        case "id":
          phpFilePath = "../include/course/getCourses.php";
          break;
        case "all":
          phpFilePath = "../include/course/getAllCourses.php";
          break;
        case "mine":
          phpFilePath = "../include/course/getMyCourses.php";
          break;
      }

      const result = await AJAXCall({
        phpFilePath,
        rejectMessage: "Getting Courses Failed",
        params,
        type: "fetch",
      });

      setTimeout(() => {
        // console.log("result", result);

        if (result && result.length > 0) {
          // console.log("so far so good.");
          loadCoursesUIForExam(result, options, userID);
          resolve();
        } else {
          //TODO: This part might cause bugs in future versions
          courseViewContainer.innerHTML = "";

          // console.log("options: ", options);

          switch (options) {
            case "id": // Refactor this to be "teacher"
              courseViewContainer.appendChild(emptyView);
              break;
            case "all": // Refactor this to be "student subscriptions"
              courseViewContainer.appendChild(studentEmptyView);
            case "mine": // Refactor this to be "mine -- or -- classview"
              courseViewContainer.appendChild(myEmptyView);
          }
        }
      }, 2000);
    } catch (error) {}
  });

  function loadCoursesUIForExam(coursesObject, options, userID) {
    courseViewContainer.innerHTML = "";

    coursesObject.map(async (course) => {
      const { id, title, image, courseCode } = course;

      let courseCard = createElement("div", "course-card");

      let courseCardImage = createElement("div", "course-card-image");
      let imageElement = document.createElement("img");

      imageElement.src =
        image.length > 2
          ? await checkImage(`../uploads/${image}`)
          : `../assets/images/courseDefault.jpg`;

      courseCardImage.appendChild(imageElement);

      let cardText = createElement("div", "card-text");
      let courseCardCode = createElement("div", "course-card-code");
      let courseCardTitle = createElement("div", "course-card-title");

      courseCardCode.textContent = courseCode;
      courseCardTitle.textContent = title;

      cardText.appendChild(courseCardCode);
      cardText.appendChild(courseCardTitle);

      let cardOverlay = createElement("div", "card-overlay");

      courseCard.appendChild(courseCardImage);
      courseCard.appendChild(cardText);
      courseCard.appendChild(cardOverlay);

      let subscriptionResult = await getCourseSubscriptionStatus(id, userID);

      courseCard.addEventListener("click", () => {
        switch (options) {
          case "id":
            goToExams(id);
            break;
          case "all":
            // TODO: Using Subscriptions, toggle different popups.
            subscriptionEvent(subscriptionResult, { id, userID })();
            break;
          case "mine":
            goToCourse(id);
            break;
        }
      });

      // This is the subscription part for the student view.
      let subscriptionIcon = document.createElement("div");
      subscriptionIcon.className = "subscription-icon";
      let tickImageElement = document.createElement("img");
      tickImageElement.src = "../assets/icons/check.png";
      subscriptionIcon.appendChild(tickImageElement);

      try {
        if (subscriptionResult[0].status == "true") {
          //   courseCard.appendChild(subscriptionIcon);
        }
      } catch (error) {}
      // ENDS HERE

      courseViewContainer.appendChild(courseCard);
    });

    function subscriptionEvent(subscriptionArray, { id, userID }) {
      try {
        if (subscriptionArray.length > 0) {
          let status = subscriptionArray[0];
          console.log("status: ", status);
          if (status.status == "true")
            return () => showDeRegisterPopup(id, userID);
          // else return showDeRegisterPopup;
        } else return () => showRegisterPopup(id, userID);
      } catch (error) {}
    }

    function showDeRegisterPopup(courseID, userID) {
      console.log(
        "Course has been registered, click will bring up de registration option"
      );
    }

    function showRegisterPopup(courseID, userID) {
      let enrollButton = document.querySelector(".enroll-course-button");
      enrollButton.setAttribute("data-courseID", courseID);
      enrollButton.setAttribute("data-userID", userID);

      openPopup(".register-to-course");

      console.log("Course has not been registered");
    }
  }

  async function getCourseSubscriptionStatus(id, userID) {
    return await AJAXCall({
      phpFilePath: "../include/course/getSubscriptionStatus.php",
      rejectMessage: "Getting Status Failed",
      params: `id=${id}&&userID=${userID}`,
      type: "fetch",
    });
  }

  function goToCourse(id) {
    console.log("curent id:", id);
    openPopup(".classroom-inner-overlay");
    let classRoomOverlay = document.querySelector(".classroom-inner-overlay");
    classRoomOverlay.setAttribute("id", id);
    renderCourseOutline(id);
  }
}

function goToExams(id) {
  let mainContainer = document.querySelector(".main-container");
  mainContainer.setAttribute("data-id", id);

  closePopup(".course-view-container");
  openPopup(".edit-course-container");

  let titleElement = document.querySelector("#course-title");
  titleElement.textContent = "";

  let courseCode = document.querySelector("#course-code");
  courseCode.textContent = "";

  fetchCourseWithIDForExam(id);
}

async function fetchCourseWithIDForExam(givenID) {
  let courseGridContainer = findElement("#course-grid-container");
  let loader = `
      <div class="loader">
          <div class="sk-chase">
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
              <div class="sk-chase-dot"></div>
          </div>
      </div>`;

  courseGridContainer.innerHTML = loader;

  let courses = await getCourseDetails(givenID);

  if (courses.length > 0) if (courses[0].status == "error") return;

  let selectedCourse = courses[0];

  (function sortCourses(course) {
    course.lectures.sort((firstLecture, secondLecture) => {
      firstLecture.subtopics.sort(
        (firstSubtopic, secondSubtopic) =>
          firstSubtopic.hierarchy - secondSubtopic.hierarchy
      );

      return firstLecture.hierarchy - secondLecture.hierarchy;
    });
  })(selectedCourse);

  setTimeout(() => {
    // This is very important
    let deleteButton = clearEventListenersFor(
      findElement("#deleteCourseButton")
    );

    let course = new Course(selectedCourse);
    course.renderTitle();
    course.renderCourseCode();
    course.renderDeleteButton(deleteButton);
    course.renderEditLearningObjectivesButton();
    course.renderLectureSection();

    findElement("#addNewLecture").addEventListener("click", () => {
      course.addLectureElement();
    });

    findElement("#saveCourseDetails").addEventListener("click", async () => {
      courseItemObjectLooper(course);
    });

    findElement("#excelCourseFileUpload").addEventListener(
      "change",
      async (event) => {
        console.log("clickeddddd");

        try {
          let file = event.target.files[0];
          const objectURL = window.URL.createObjectURL(file);
          let result = await parseExcelForCourseObject(objectURL);
          course.markAllForDeletion();
          course.eraseForExcelUpload(result);
          findElement("#excelCourseFileUpload").value = "";
        } catch (error) {
          console.log(error);
        }
      }
    );
  }, 2000);
}
