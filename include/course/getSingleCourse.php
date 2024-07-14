<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
    SELECT *
    FROM `courses` WHERE id = '$id'
    ";

    $examsResult = mysqli_query($conn,$query);
    $course = mysqli_fetch_all($examsResult,MYSQLI_ASSOC);

    echo json_encode($course);

