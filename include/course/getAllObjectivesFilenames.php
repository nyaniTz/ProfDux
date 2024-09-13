<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
    SELECT objectives.id, objectives.courseID, courses.courseCode, courses.title, objectives.filename from objectives
    INNER JOIN courses ON courses.id = objectives.courseID
    ";

    $objectivesResult = mysqli_query($conn,$query);
    $objective = mysqli_fetch_all($objectivesResult,MYSQLI_ASSOC);

    echo json_encode($objective);

