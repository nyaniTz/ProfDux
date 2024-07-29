<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Weight Assignment"></page> 

        <?php include '../include/teacherImports.php'; ?>

        <script src="../js/Weights.js?2"></script>


    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <h1>Weights</h1>

                <div class="weights-outer-container">
                </div>
            </div>
        </div>

        <script>

            let userID = "ef87w9r42rbw";

            ( async() => {

                let result = await AJAXCall({
                    phpFilePath: "../include/weights/getWeightsForCourses.php",
                    rejectMessage: "Weights Not Fetched",
                    type: "fetch",
                    params: `userID=${userID}`,
                });

                console.log("result: ",  result);

                const weights = new Weights(result);
                weights.render();

            })();
        </script>
    </body>
</html>