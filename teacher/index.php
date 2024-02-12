<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Dashboard"></page> 
        <!-- TODO: Make sure you change the data-id for every page -->

        <?php include '../include/teacherImports.php'; ?>

    </head>
    <body>

        <style>

            .dashboard-card {
                position: relative;
                background-color: var(--accent);
                color: white;
                padding: 20px;
                border-radius: 10px;
                min-height: 150px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 10px;
                overflow: hidden;
                cursor: pointer;
                transition: 0.3s;
                
            }

            .dashboard-card:hover {
            transform: scale(0.93);
            opacity: 0.9;
            }

            .dashboard-card img {
            height: 150px;
            filter: invert(100%);
            opacity: 0.2;
            position: absolute;
            left: -80px;
            top: -50px;
            }

            .dashboard-card > p {
            font-size: 1.3em;
            font-weight: 200;
            }

            .dashboard-card > span {
            font-size: 5em;
            font-weight: 600;
            justify-self: end;
            }
            
        </style>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">

                <div class="min-max-container">
                    <div class="dashboard-card">
                        <img src="../assets/icons/fi/fi-rr-racquet.svg" alt="">
                        <p>Courses</p>
                        <span id="dashboard-courses-count">0</span>
                    </div>

                    <div class="dashboard-card">
                        <img src="../assets/icons/fi/fi-rr-racquet.svg" alt="">
                        <p>Total Students</p>
                        <span id="dashboard-courses-count">0</span>
                    </div>

                    <div class="dashboard-card">
                        <img src="../assets/icons/fi/fi-rr-racquet.svg" alt="">
                        <p>Unread Messages</p>
                        <span id="dashboard-courses-count">0</span>
                    </div>

                    <div class="dashboard-card">
                        <img src="../assets/icons/fi/fi-rr-racquet.svg" alt="">
                        <p>Exams</p>
                        <span id="dashboard-courses-count">0</span>
                    </div>
                </div>

            </div>
        </div>
    </body>
</html>