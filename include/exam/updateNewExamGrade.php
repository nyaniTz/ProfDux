<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();
   
    $id = $_POST['id'];
    $filename = $_POST['filename'];
    $status = $_POST['status'];
    $value = $_POST['value'];
    $timeEnded = $_POST['timeEnded'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        UPDATE examGrades
        SET filename='$filename', status = '$status', timeEnded = '$timeEnded',
        value = '$value'
        WHERE id='$id'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
