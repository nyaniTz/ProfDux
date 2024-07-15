<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $courseID = $_POST["id"];

    if($courseID){

        $subscriptionsQuery = "
            SELECT userID FROM `subscriptions` 
            WHERE subscriptions.courseID = '$courseID' && status = 'true'
        ";

        $subscriptionsResult = mysqli_query($conn,$subscriptionsQuery);
        $subscriptions = mysqli_fetch_all($subscriptionsResult,MYSQLI_ASSOC);

        // $examQuery = "
        //     SELECT * FROM `exam` 
        //     WHERE exam.courseID = '$courseID'
        //     ORDER BY exam.hierarchy
        // ";

        // $examResult = mysqli_query($conn,$examQuery);
        // $courses = mysqli_fetch_all($examResult,MYSQLI_ASSOC);

        $quizGradesArray = array();

        foreach($subscriptions as $subscription){

            $userID = $subscription['userID'];

            $quizGradeQuery = "
                SELECT quizID, filename, status, value FROM `quizGrades`
                WHERE quizGrades.userID = '$userID' && courseID = '$courseID'
            ";

            $quizGradeResults = mysqli_query($conn,$quizGradeQuery);
            $quizGrades = mysqli_fetch_all($quizGradeResults,MYSQLI_ASSOC);

            $quizGradesArray[] = array(
                $userID => $quizGrades
            );

        }

        $resultA = array(
            "quizGrades" => $quizGradesArray,
            "exams" => array()
        );

        echo json_encode($resultA);

    }
    else{
        echo json_encode(array("status" => "error"));
    }