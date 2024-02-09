<?php
    session_start();
?>

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

        <script>

            async function getUserDetails(){

                try{
                    let result = await AJAXCall({
                        phpFilePath: "../include/getPersonalDetails.php",
                        rejectMessage: "Getting Personal Details Failed",
                        params: "",
                        type: "fetch"
                    });
                    
                    if(result){
                        return result[0];
                    }
                }
                catch(error){
                    console.log(error);
                    // TODO: Logout
                }

            }

            ( async () => {

              
                let result = await getUserDetails();
                console.log(result);

  
            })();

        </script>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <?php include 'components/dashboard.php'; ?>
            </div>
        </div>
    </body>
</html>