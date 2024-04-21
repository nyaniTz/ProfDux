<?php

include "../databaseConnection.php"; 

$conn = OpenConnection();

$examID = $_POST['examID'];
$language = $_POST['language'];

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Dize tırnaklarını düzgün şekilde yerleştir
$query = "
    SELECT *
    FROM `files`
    WHERE examID='$examID' AND language='$language'
";

$examResults = mysqli_query($conn, $query);
$files = mysqli_fetch_all($examResults, MYSQLI_ASSOC);
echo json_encode($files);
