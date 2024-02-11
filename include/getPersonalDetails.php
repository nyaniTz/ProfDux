<?php

    session_start();

    include "databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userID = $_SESSION['id'];

    if($userID){

        $query = "
            SELECT users.id, email, role, users.timestamp, name, address, image, phone, institutionID, department  FROM `users`
            JOIN userDetails ON users.id = userDetails.id
            WHERE users.id = '$userID'
        ";

        $result = mysqli_query($conn,$query);

        $details = mysqli_fetch_all($result,MYSQLI_ASSOC);

        echo json_encode($details);

    }
    else {
        echo "error";
    }