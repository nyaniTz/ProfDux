<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $title = $_POST['title'];
    $courseCode = $_POST['courseCode'];
    $creatorID = $_POST['creatorID'];
    $image = $_POST['image'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO courses (id, title, courseCode, creatorID, image)
        VALUES ('$id', '$title', '$courseCode', '$creatorID', '$image')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
