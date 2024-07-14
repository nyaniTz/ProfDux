<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $userID = $_POST['userID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT status FROM `subscriptions`
        INNER JOIN courses ON courses.id = subscriptions.courseID
        WHERE subscriptions.userID = '$userID' AND subscriptions.courseID = '$id'
    ";

    $examsResult = mysqli_query($conn,$query);
    $exams = mysqli_fetch_all($examsResult,MYSQLI_ASSOC);

    echo json_encode($exams);

