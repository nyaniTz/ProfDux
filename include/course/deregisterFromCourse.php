<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $courseID = $_POST['courseID'];
    $userID = $_POST['userID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        DELETE FROM `subscriptions`
        WHERE courseID='$courseID' AND userID='$userID'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
