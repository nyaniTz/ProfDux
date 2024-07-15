<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userID = $_POST["id"];

    if($userID){

        $subscriptionsQuery = "
            SELECT subscriptions.courseID, courses.title, courses.image, courses.courseCode FROM `courses` 
            INNER JOIN subscriptions ON subscriptions.courseID = courses.ID
            WHERE subscriptions.userID = '$userID' && status = 'true'
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

        $quizGradesArray = [];

        foreach($subscriptions as $subscription){

            $courseID = $subscription['courseID'];
            $courseTitle = $subscription['title'];
            $courseImage = $subscription['image'];
            $courseCode = $subscription['courseCode'];
            
            $quizGradeQuery = "
                SELECT quizID, filename, status, value, hierarchy, totalMarks FROM `quizGrades`
                WHERE quizGrades.userID = '$userID' && courseID = '$courseID'
                ORDER BY hierarchy
            ";

            $quizGradeResults = mysqli_query($conn,$quizGradeQuery);
            $quizGrades = mysqli_fetch_all($quizGradeResults,MYSQLI_ASSOC);

            $quizGradesArray[] = array(
                "grades" => $quizGrades,
                "title" => $courseTitle,
                "courseID" => $courseID,
                "image" => $courseImage,
                "courseCode" => $courseCode
            );

        }

        $resultA = array(
            "quizGrades" => $quizGradesArray,
            "exams" => []
        );

        echo json_encode($resultA);

    }
    else{
        echo json_encode(array("status" => "error"));
    }