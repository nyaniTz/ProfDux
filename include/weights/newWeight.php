<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $courseID = $_POST['courseID'];
    $foreignID = $_POST['foreignID'];
    $type = $_POST['type'];
    $value = $_POST['value'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO weights (id, courseID, foreignID, type, value)
        VALUES ('$id', '$courseID', '$foreignID', '$type', '$value')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
