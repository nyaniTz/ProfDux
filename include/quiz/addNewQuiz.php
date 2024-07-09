<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $lectureID = $_POST['lectureID'];
    $courseID = $_POST['courseID'];
    $name = $_POST['name'];
    $dateGenerated = $_POST['dateGenerated'];
    $filename = $_POST['filename'];
    $totalMarks = $_POST['totalMarks'];
    $hierarchy = $_POST['hierarchy'];


    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO quiz (id, name, courseID, lectureID, dateGenerated, filename, totalMarks, hierarchy)
        VALUES ('$id', '$name', '$courseID', '$lectureID', '$dateGenerated', '$filename', '$totalMarks', '$hierarchy')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
