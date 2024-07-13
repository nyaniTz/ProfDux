<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $courseID = $_POST["id"];

    if($courseID){

        $subscriptionsQuery = "
            SELECT quiz.id, quiz.hierarchy, quiz.name, quiz.totalMarks FROM `quiz` 
            INNER JOIN courses ON courses.id = quiz.courseID
            WHERE quiz.courseID = '$courseID'
            ORDER BY quiz.hierarchy
        ";

        $subscriptionsResult = mysqli_query($conn,$subscriptionsQuery);
        $subscriptions = mysqli_fetch_all($subscriptionsResult,MYSQLI_ASSOC);

        echo json_encode($subscriptions);

    }
    else{
        echo json_encode(array("status" => "error"));
    }