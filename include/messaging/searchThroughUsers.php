<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $input = $_POST["input"];

    if($input){

        $searchQuery = "
            SELECT id, name FROM userDetails
            WHERE name REGEXP '$input'
            LIMIT 3
        ";

        $result= mysqli_query($conn,$searchQuery);
        $users = mysqli_fetch_all($result,MYSQLI_ASSOC);

        echo json_encode($users);

    }
    else{
        echo json_encode(array("status" => "error"));
    }