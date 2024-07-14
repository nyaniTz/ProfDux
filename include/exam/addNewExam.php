<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $courseID = $_POST['courseID'];
    $name = $_POST['name'];
    $filename = $_POST['filename'];
    $minutes = $_POST['minutes'];
    $date = $_POST['date'];
    $dateGenerated = $_POST['dateGenerated'];
    $hierarchy = $_POST['hierarchy'];
    $languages = $_POST['languages'];
    $totalQuestions = $_POST['totalQuestions'];
    $totalMarks = $_POST['totalMarks'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO exam (id, courseID, name, filename, minutes, date, dateGenerated, hierarchy, languages, totalQuestions, totalMarks)
        VALUES ('$id', '$courseID', '$name', '$filename', '$minutes', '$date', '$dateGenerated', '$hierarchy', '$languages', '$totalQuestions', '$totalMarks')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
