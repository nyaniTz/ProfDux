<?php

    session_start();

    include "databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "SELECT id, email, users.role FROM users WHERE email = '$email' AND password = '$password'";

    $result = mysqli_query($conn,$query);
    $row = mysqli_fetch_array($result);

    CloseConnection($conn);

    if(mysqli_num_rows($result) == 1){ 

        $_SESSION['id'] = $row[0];
        $_SESSION['role'] = $row[2];

        echo json_encode(
            array("id" => $row[0],"email" => $row[1], "role" => $row[2], "state" => "success")
        );

    }
    else {
        echo json_encode(array("state" => "error"));
    }
