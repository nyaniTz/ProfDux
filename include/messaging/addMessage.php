<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $senderID = $_POST['senderID'];
    $receiverID = $_POST['receiverID'];
    $type = $_POST['type'];
    $timeSent = $_POST['timeSent'];
    $message = $_POST['message'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        INSERT INTO messages (id, senderID, receiverID, type, timeSent, message)
        VALUES ('$id', '$senderID', '$receiverID', '$type', '$timeSent', '$message')
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
