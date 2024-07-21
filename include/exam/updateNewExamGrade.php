<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();


    // id,
    // userID,	
    // examID,	
    // filename,
    // timeStarted: ,	
    // timeEnded: ,	
    // status

    $id = $_POST['id'];
    $userID = $_POST['userID'];
    $examID = $_POST['examID'];
    $filename = $_POST['filename'];
    $status = $_POST['status'];
    $value = $_POST['value'];
    $timeEnded = $_POST['timeEnded'];
    $totalMarks = $_POST['totalMarks'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        UPDATE examGrades
        SET filename='$filename', status = '$status', timeEnded = '$timeEnded',
        value = '$value', examID = '$examID', userID = '$userID', totalMarks = '$totalMarks'
        WHERE id='$id'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
