<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $id = $_POST["id"];

    if($id){

        $query = "
            SELECT courses.id, courses.courseCode, courses.title, courses.image, userDetails.name FROM subscriptions
            INNER JOIN courses ON courses.id = subscriptions.courseID
            INNER JOIN users ON subscriptions.userID = users.id
            INNER JOIN userDetails ON courses.creatorID = userDetails.id
            WHERE users.id = '$id'
        ";

        $result = mysqli_query($conn,$query);
        $exams = mysqli_fetch_all($result,MYSQLI_ASSOC);

        $finalResult = array();

        foreach($exams as $course) {

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
                
                $lectureArray[] = array(
                    "id" => $lectureID,
                    "title" => $lecture['title'],
                    "time" => $lectureTime[0],
                    "hierarchy" => $lecture['hierarchy'],
                );

            }

            $resultA = array(
                "id" => $course['id'],
                "title" => $course['title'],
                "courseCode" => $course['courseCode'],
                "lectures" => $lectureArray,
                "image" => $course['image'],
                "courseInstructor" => $course['name']
            );

            $finalResult[] = $resultA;

        }

        echo json_encode($finalResult);

    }
    else{
        echo json_encode(array("status" => "error"));
    }