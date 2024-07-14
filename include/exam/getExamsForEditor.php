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

    $examsResult = mysqli_query($conn,$query);
    $exams = mysqli_fetch_all($examsResult,MYSQLI_ASSOC);

    echo json_encode($exams);

