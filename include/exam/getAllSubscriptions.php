<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $userID = $_POST['userID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        SELECT * FROM `subscriptions`
        WHERE userID = '$userID'
    ";

    $subscriptionsResult = mysqli_query($conn,$query);
    $subscriptions = mysqli_fetch_all($subscriptionsResult,MYSQLI_ASSOC);

    echo json_encode($subscriptions);

