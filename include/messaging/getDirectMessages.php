<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userID = $_POST["senderID"];

    if($userID){

        $messagesQuery = "
            SELECT messages.id, type, timeSent, message, name, image  FROM `messages`
            INNER JOIN userDetails ON userDetails.id = messages.senderID
            WHERE messages.receiverID = '$userID' && messages.type = 'direct'
        ";

        $messagesResult = mysqli_query($conn,$messagesQuery);
        $messages = mysqli_fetch_all($messagesResult,MYSQLI_ASSOC);

        echo json_encode($messages);

    }
    else{
        echo json_encode(array("status" => "error"));
    }