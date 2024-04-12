<?php

include "../databaseConnection.php";

$conn = OpenConnection();

$id = $_POST['id'];
$courseID = $_POST['courseID'];
$dateGenerated = $_POST['dateGenerated'];
$filename = $_POST['filename'];
$minutes = $_POST['minutes'];
$examDate = $_POST['examDate'];
$amountOfTrueFalseQuestions = $_POST['amountOfTrueFalseQuestions'];
$amountOfMultipleChoicesQuestions = $_POST['amountOfMultipleChoicesQuestions'];
$amountOfMatchingQuestions = $_POST['amountOfMatchingQuestions'];
$amountOfFillInTheBlankQuestions = $_POST['amountOfFillInTheBlankQuestions'];
$mediumQuestionsCount = $_POST['mediumQuestionsCount'];
$hardQuestionsCount = $_POST['hardQuestionsCount'];
$easyQuestionsCount = $_POST['easyQuestionsCount'];
$examName = $_POST['examName'];


if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "
        INSERT INTO exam (id, courseID, dateGenerated, filename, minutes, examDate,amountOfTrueFalseQuestions,amountOfMultipleChoicesQuestions,amountOfMatchingQuestions,amountOfFillInTheBlankQuestions,easyQuestionsCount,mediumQuestionsCount,hardQuestionsCount,examName)
        VALUES ('$id', '$courseID', '$dateGenerated', '$filename', '$minutes', '$examDate','$amountOfTrueFalseQuestions','$amountOfMultipleChoicesQuestions','$amountOfMatchingQuestions','$amountOfFillInTheBlankQuestions','$easyQuestionsCount','$mediumQuestionsCount','$hardQuestionsCount','$examName')
    ";

$result = mysqli_query($conn, $query);

if ($result) echo "success";
