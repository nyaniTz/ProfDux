<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $value = $_POST['value'];
    $type = $_POST['type'];
    $subtopicID = $_POST['subtopicID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO resources (id, type, value, subtopicID)
        VALUES ('$id', '$type', '$value', '$subtopicID')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
