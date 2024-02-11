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

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <?php include 'components/dashboard.php'; ?>
            </div>
        </div>
    </body>
</html>