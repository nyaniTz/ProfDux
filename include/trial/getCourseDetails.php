<?php

    include "../databaseConnection.php"; 

    $conn = OpenConnection();

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $courseID = "ltcvladl";

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

            echo $course['id'];
            
            $lectureQuery = "
            SELECT *
            FROM `lectures` WHERE courseID = '$courseID'
            ";

            $lectureResult = mysqli_query($conn,$lectureQuery);
            $lectures = mysqli_fetch_all($lectureResult,MYSQLI_ASSOC);

            $lectureArray = array();

            foreach($lectures as $lecture){

                $lectureID = $lecture['id'];

                echo $lecture['id'];
                
                $subtopicQuery = "
                SELECT *
                FROM `subtopics` WHERE lectureID = '$lectureID'
                ";

                $subtopicResult = mysqli_query($conn,$subtopicQuery);
                $subtopics = mysqli_fetch_all($subtopicResult,MYSQLI_ASSOC);

                $subtopicArray = array();

                foreach($subtopics as $subtopic){

                    $subtopicID = $subtopic['id'];
                    
                    $resourceQuery = "
                    SELECT *
                    FROM `resources` WHERE subtopicID = '$subtopicID'
                    ";
    
                    $resourcesResult = mysqli_query($conn,$resourceQuery);
                    $resources = mysqli_fetch_all($resourcesResult,MYSQLI_ASSOC);

                    $subtopicArray[] = array(
                        "id" => $subtopicID,
                        "title" => $subtopic['title'],
                        "hierarchy" => $subtopic['hierarchy'],
                        "resources" => $resources
                    );
                    
                }

                $quizQuery = "
                SELECT *
                FROM `quiz` WHERE lectureID = '$lectureID'
                ";

                $quizResult = mysqli_query($conn,$quizQuery);
                $quizzes = mysqli_fetch_all($quizResult,MYSQLI_ASSOC);

                $lectureArray[] = array(
                    "id" => $lectureID,
                    "title" => $lecture['title'],
                    "hierarchy" => $lecture['hierarchy'],
                    "subtopics" => $subtopicArray,
                    "quizzes" => $quizzes
                );

            }

            $resultA = array(
                "id" => $course['id'],
                "title" => $course['title'],
                "courseCode" => $course['courseCode'],
                "lectures" => $lectureArray
            );

            echo json_encode($resultA);

            $finalResult[] = $resultA;

        }

        echo json_encode($finalResult);

    }