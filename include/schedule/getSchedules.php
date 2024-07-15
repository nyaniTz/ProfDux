<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $personalID = $_POST["id"];

    if($personalID){

        $query = "
        SELECT *
        FROM `courses` WHERE creatorID = '$personalID'
        ";

        $result = mysqli_query($conn,$query);
        $courses = mysqli_fetch_all($result,MYSQLI_ASSOC);

        $finalResult = array();

        foreach($courses as $course) {

            $courseID = $course['id'];
            
            $lectureQuery = "
            SELECT id, title
            FROM `lectures` WHERE courseID = '$courseID'
            ORDER BY hierarchy
            ";

            $lectureResult = mysqli_query($conn,$lectureQuery);
            $lectures = mysqli_fetch_all($lectureResult,MYSQLI_ASSOC);

            $lectureArray = array();

            foreach($lectures as $lecture){

                $lectureID = $lecture['id'];
                
                $scheduleQuery = "
                SELECT *
                FROM `schedules` WHERE foreignID = '$lectureID'
                ";

                $scheduleResult = mysqli_query($conn,$scheduleQuery);
                $schedules = mysqli_fetch_all($scheduleResult,MYSQLI_ASSOC);

                $lectureArray[] = array(
                    "id" => $lectureID,
                    "title" => $lecture['title'],
                    "time" => $schedules,
                );

            }

            $examQuery = "
                SELECT id, name
                FROM `exam` WHERE courseID = '$courseID'
                ORDER BY hierarchy
            ";

            $examResult = mysqli_query($conn,$examQuery);
            $exams = mysqli_fetch_all($examResult,MYSQLI_ASSOC);

            $examsArray = array();

            foreach($exams as $exam){

                $examID = $exam['id'];
                
                $scheduleQuery = "
                    SELECT *
                    FROM `schedules` WHERE foreignID = '$examID'
                ";

                $scheduleResult = mysqli_query($conn,$scheduleQuery);
                $schedules = mysqli_fetch_all($scheduleResult,MYSQLI_ASSOC);

                $examsArray[] = array(
                    "id" => $examID,
                    "title" => $exam['name'],
                    "time" => $schedules,
                );

            }

            $resultA = array(
                "id" => $course['id'],
                "title" => $course['title'],
                "courseCode" => $course['courseCode'],
                "image" => $course['image'],
                "lectures" => $lectureArray,
                "exams" => $examsArray,
            );

            $finalResult[] = $resultA;

        }

        echo json_encode($finalResult);

    }
    else{
        echo json_encode(array("status" => "error"));
    }