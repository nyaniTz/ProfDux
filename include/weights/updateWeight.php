<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];
    $value = $_POST['value'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "       
        UPDATE weights
        SET value='$value'
        WHERE id='$id'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";