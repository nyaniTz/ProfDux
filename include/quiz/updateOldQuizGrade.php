<?php

    include "../databaseConnection.php"; 


    $conn = OpenConnection();

    $id = $_POST['id'];
    $value = $_POST['value'];
    $timeEnded = $_POST['timeEnded'];
    $totalMarks = $_POST['totalMarks'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        UPDATE quizGrades
        SET value='$value', status = 'done', timeEnded = '$timeEnded', totalMarks = '$totalMarks'
        WHERE id='$id'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
