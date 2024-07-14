<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT * FROM `courses`
    ";

    $examsResult = mysqli_query($conn,$query);
    $exams = mysqli_fetch_all($examsResult,MYSQLI_ASSOC);

    echo json_encode($exams);

