<?php

include "../databaseConnection.php";

$conn = OpenConnection();

$id = $_POST['id'];
$filename = $_POST['filename'];
$dateGenerated = $_POST['dateGenerated'];
$examID = $_POST['examID'];
$language = $_POST['language'];

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "
        INSERT INTO files (id, filename, dateGenerated, examID, language)
        VALUES ('$id', '$filename', '$dateGenerated', '$examID', '$language')
    ";

$result = mysqli_query($conn, $query);

if ($result) echo "success";
