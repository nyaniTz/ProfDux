<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userID = $_POST["senderID"];

    if($userID){

        $messagesQuery = "
            SELECT messages.id, type, timeSent, message, image, title AS name  FROM `messages`
            INNER JOIN courses ON courses.id = messages.receiverID
            WHERE messages.senderID = '$userID' && messages.type = 'announcement'
        ";

        $messagesResult = mysqli_query($conn,$messagesQuery);
        $messages = mysqli_fetch_all($messagesResult,MYSQLI_ASSOC);

        echo json_encode($messages);

    }
    else{
        echo json_encode(array("status" => "error"));
    }