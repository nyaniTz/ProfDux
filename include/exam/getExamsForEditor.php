<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
    SELECT *
    FROM `exam` WHERE courseID = '$id'
    ";

    $coursesResult = mysqli_query($conn,$query);
    $courses = mysqli_fetch_all($coursesResult,MYSQLI_ASSOC);

    echo json_encode($courses);

