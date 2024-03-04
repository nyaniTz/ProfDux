<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $foreignID = $_POST['foreignID'];
    $timeStart = $_POST['timeStart'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "       
        UPDATE schedules
        SET timeStart='$timeStart'
        WHERE foreignID='$foreignID'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";