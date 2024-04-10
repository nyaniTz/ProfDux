<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    $examID = $_POST['examID'];

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $query = "
    SELECT *
    FROM `exam`
    WHERE id='$examID''
    ";

    $examResults = mysqli_query($conn,$query);
    $exams = mysqli_fetch_all($examResults,MYSQLI_ASSOC);

    echo json_encode($exams);

