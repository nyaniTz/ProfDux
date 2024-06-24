<?php

    include "databaseConnection.php"; 


    $conn = OpenConnection();

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $id = $_POST['id'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
        UPDATE userDetails
        SET name='$name', phone='$phone', address='$address'
        WHERE id='$id'
    ";

    $result = mysqli_query($conn,$query);

    if($result) echo "success";
