<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
    SELECT courses.id, courses.courseCode, courses.title, courses.semester, courses.creatorID, courses.image, subscriptions.status
    FROM `courses` 
    INNER JOIN subscriptions ON subscriptions.courseID = courses.id
    WHERE subscriptions.userID = '$id'
    ";

    $examsResult = mysqli_query($conn,$query);
    $exams = mysqli_fetch_all($examsResult,MYSQLI_ASSOC);

    echo json_encode($exams);

