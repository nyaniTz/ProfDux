<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $id = $_POST['id'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
    SELECT *
    FROM `exam` WHERE id = '$id'
    ";

    $examResult = mysqli_query($conn,$query);
    $examDetails = mysqli_fetch_all($examResult,MYSQLI_ASSOC);

    echo json_encode($examDetails);

