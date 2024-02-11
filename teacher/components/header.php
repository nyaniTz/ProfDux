<?php

    session_start();
    $username = isset($_SESSION['id']);
    $role = isset($_SESSION['role']);

    if(!$username && $role != 'teacher'){ header('location:../auth.php'); }

?>

<div class="header">
    <div class="header-logo">
        <img src="../assets/images/air-logo.png" alt="">
    </div>

    <div class="header-action-bar">
        <?php

            if($_SESSION["role"] != "student"){
                echo "
                <a href='../student' class='switch-button'>
                    <img class='icon' src='../assets/icons/fi/fi-rr-arrows-repeat.svg' alt='' class='regular-icon'> 
                </a>";
            }

        ?>

        <div class="username">
        </div>
        <div class="user-image">
            <img src="" alt="">
        </div>
        <div class="logout-button" onclick="logoutDialog()">
            <img class='icon' src="../assets/icons/fi/fi-rr-arrow-right-to-bracket.svg" alt="" class="regular-icon">
        </div>
    </div>
</div>