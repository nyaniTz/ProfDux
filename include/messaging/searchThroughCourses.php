<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $input = $_POST["input"];
    $senderID = $_POST["senderID"];

    if($input){

        $searchQuery = "
            SELECT id, title AS name FROM courses
            WHERE title REGEXP '$input' AND creatorID = '$senderID'
            LIMIT 3
        ";

        $result= mysqli_query($conn,$searchQuery);
        $courses = mysqli_fetch_all($result,MYSQLI_ASSOC);

        echo json_encode($courses);

    }
    else{
        echo json_encode(array("status" => "error"));
    }