<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $userID = $_POST['userID'];
    $examID = $_POST['examID'];
    $status = $_POST['status'];
    $timeStarted = $_POST['timeStarted'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO examGrades (id, userID, examID, status, timeStarted)
        VALUES ('$id', '$userID', '$examID', '$status', '$timeStarted')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
