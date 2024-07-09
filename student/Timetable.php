<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Student</title>
        <page data-id="Timetable"></page> 

        <?php include '../include/studentImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <h1 class="large-title">
                    Timetable
                </h1>
            </div>
        </div>

        <script>

            const id = "ef87w9r42rbw";

            ( async () => {

                try {
                    
                    let result = await AJAXCall({
                        phpFilePath: "../include/schedule/getTimetable.php",
                        rejectMessage: "Getting Timetable Failed",
                        params: `id=${id}`,
                        type: "fetch"
                    });

                    console.log(result);

                }catch(error){
                    console.log(error)
                }

            })()
        </script>
    </body>
</html>