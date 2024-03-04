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
        INSERT INTO schedules (id, foreignID, timeStart)
        VALUES ('$id', '$foreignID', '$timeStart')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
