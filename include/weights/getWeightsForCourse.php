<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userID = $_POST["userID"];

    if($userID){

        $courseQuery = "
            SELECT *
            FROM `courses` WHERE creatorID = '$userID'
        ";

        $courseResult = mysqli_query($conn,$courseQuery);
        $courses = mysqli_fetch_all($courseResult,MYSQLI_ASSOC);

        $courseArray = [];

        foreach($courses as $course){

            $courseID = $course['id'];

            $quizQuery = "
                SELECT id, name
                FROM `quiz` WHERE courseID = '$courseID'
                ORDER BY quiz.hierarchy
            ";

            $quizResult = mysqli_query($conn,$quizQuery);
            $quizzes = mysqli_fetch_all($quizResult,MYSQLI_ASSOC);

            $quizArray = [];

            foreach($quizzes as $quiz){

                $quizID = $quiz['id'];

                $quizWeightQuery = "
                    SELECT *
                    FROM weights 
                    WHERE foreignID = '$quizID'
                ";

                $quizWeightResult = mysqli_query($conn,$quizWeightQuery);
                $quizWeight = mysqli_fetch_all($quizWeightResult,MYSQLI_ASSOC);

                $quizArray[] = [
                    "id" => $quizID,
                    "title" => $quiz['name'],
                    "weight" => $quizWeight,
                ];

            }

            $examQuery = "
                SELECT id, name
                FROM `exam` WHERE courseID = '$courseID'
                ORDER BY quiz.hierarchy
            ";

            $examResult = mysqli_query($conn,$examQuery);
            $exams = mysqli_fetch_all($examResult,MYSQLI_ASSOC);

            $examArray = [];

            foreach($exams as $exam){

                $examID = $exam['id'];

                $examWeightQuery = "
                    SELECT *
                    FROM weights 
                    WHERE foreignID = '$examID'
                ";

                $examWeightResult = mysqli_query($conn,$examWeightQuery);
                $examWeight = mysqli_fetch_all($examWeightResult,MYSQLI_ASSOC);

                $examArray[] = [
                    "id" => $examID,
                    "title" => $exam['name'],
                    "weight" => $examWeight,
                ];

            }

            $courseArray[] = [
                "id" => $courseID,
                "title" => $course['title'],
                "image" => $course['image'],
                "courseCode" => $course['courseCode'],
                "quizArray" => $quizArray,
                "examArray" => $examArray,
            ];

        }

        echo json_encode($courseArray);

    }
    else{
        echo json_encode(array("status" => "error"));
    }