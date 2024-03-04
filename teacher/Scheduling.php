<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Scheduling"></page> 
        
        <?php include '../include/teacherImports.php'; ?>

        <link rel="stylesheet" href="../css/datepicker/datepicker.material.css">
        <script src="../js/datepicker.js"></script>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">

                <h1 class="large-title">Course Scheduling</h1>
                
                <div class="schedules-outer-container">
                    
                </div>
            </div>
        </div>

        <script>

            ( async () => {


            let params = "id=ef87w9r42rbw";

            let result = await AJAXCall({
                phpFilePath: "../include/schedule/getSchedules.php",
                rejectMessage: "Getting Schedules Failed",
                params,
                type: "fetch"
            });

            console.log("wow", result);

            let schedules = new Schedules(result);
            schedules.renderSchedules();

                // setTimeout(() => {
                //     var datepicker = new Datepicker('.date-input', {
                //         // ranged: true,
                //     });
                // }, 3000);


            })();

        </script>
    </body>
</html>