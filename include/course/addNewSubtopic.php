<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $title = $_POST['title'];
    $lectureID = $_POST['lectureID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO subtopics (id, title, lectureID, hierarchy, done)
        VALUES ('$id', '$title', '$lectureID ', '0', 'false')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
