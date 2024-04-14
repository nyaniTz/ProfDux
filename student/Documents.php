<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Student</title>
        <page data-id="Documents"></page> 

        <?php include '../include/studentImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">        
                <h1 class="large-title">E-books</h1>
                
                <div class="ebooks-outer-container">
                    
                </div>
            </div>
        </div>

        <script>

            ( async () => {

                let { id } = await getUserDetails();
                let params = `id=${id}`;

                let result = await AJAXCall({
                    phpFilePath: "../include/schedule/getEbooks.php",
                    rejectMessage: "Getting Books Failed",
                    params,
                    type: "fetch"
                });

                console.log("wow", result);

                // let schedules = new Schedules(result);
                // schedules.renderSchedules();

                    // setTimeout(() => {
                    //     var datepicker = new Datepicker('.date-input', {
                    //         // ranged: true,
                    //     });
                    // }, 3000);

            })();

        </script>
    </body>
</html>