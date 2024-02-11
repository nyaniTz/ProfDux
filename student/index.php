<?php

    session_start();
    $username = isset($_SESSION['id']);
    if(!$username){ header('location:../auth.php'); }

?>
