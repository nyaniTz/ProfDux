<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $courseID = $_POST["id"];

    if($courseID){

        $query = "
        SELECT *
        FROM `courses` WHERE id = '$courseID'
        ";

        $result = mysqli_query($conn,$query);
        $courses = mysqli_fetch_all($result,MYSQLI_ASSOC);

        $finalResult = array();

        foreach($courses as $course) {

            $courseID = $course['id'];
            
            $lectureQuery = "
            SELECT *
            FROM `lectures` WHERE courseID = '$courseID'
            ORDER BY lectures.hierarchy
            ";

            $lectureResult = mysqli_query($conn,$lectureQuery);
            $lectures = mysqli_fetch_all($lectureResult,MYSQLI_ASSOC);

            $lectureArray = array();

            foreach($lectures as $lecture){

                $lectureID = $lecture['id'];

                $timeQuery = "
                    SELECT timeStart, timeFinish, hierarchy
                    FROM schedules 
                    INNER JOIN lectures ON schedules.foreignID = lectures.id
                    WHERE lectures.id = '$lectureID'
                ";

                $lectureTimeResult = mysqli_query($conn,$timeQuery);
                $lectureTime = mysqli_fetch_all($lectureTimeResult,MYSQLI_ASSOC);
                

                $resourceQuery = "
                SELECT *
                FROM `resources` WHERE lectureID = '$lectureID'
                ";

                $resourcesResult = mysqli_query($conn,$resourceQuery);
                $resources = mysqli_fetch_all($resourcesResult,MYSQLI_ASSOC);

                $quizQuery = "
                SELECT *
                FROM `quiz` WHERE lectureID = '$lectureID'
                ";

                $quizResult = mysqli_query($conn,$quizQuery);
                $quizzes = mysqli_fetch_all($quizResult,MYSQLI_ASSOC);

                $lectureArray[] = array(
                    "id" => $lectureID,
                    "title" => $lecture['title'],
                    "time" => $lectureTime[0],
                    "hierarchy" => $lecture['hierarchy'],
                    "resources" => $resources,
                    "quizzes" => $quizzes
                );

            }

            $resultA = array(
                "id" => $course['id'],
                "title" => $course['title'],
                "courseCode" => $course['courseCode'],
                "lectures" => $lectureArray
            );

            $finalResult[] = $resultA;

        }

        echo json_encode($finalResult);

    }
    else{
        echo json_encode(array("status" => "error"));
    }