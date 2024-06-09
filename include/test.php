<?php

    session_start();

    include "databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT * FROM `users`
    ";

    $result = mysqli_query($conn,$query);

    $details = mysqli_fetch_all($result,MYSQLI_ASSOC);

    echo json_encode($details);
