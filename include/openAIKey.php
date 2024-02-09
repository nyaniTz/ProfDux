<?php
    
    include ("conn.php");

    $query = "SELECT * FROM `secrets` WHERE id = '5555'";
    $result = $conn->query($query);

    if($result){
        $userDetails = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($userDetails);
    }

