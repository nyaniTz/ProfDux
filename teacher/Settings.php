<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Settings"></page> 
        
        <?php include '../include/teacherImports.php'; ?>

        <script src="../js/settings.js" defer></script>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>

            <div class="main-container">
                <form class="edit-personal-details">
                    <label for="personalImageUpload" class="personal-upload-input">
                        <div class="personal-image-view user-image">
                            <img class="personal-image-view-element" src="" alt="">
                        </div>

                        <input id="personalImageUpload" class="upload-input" type="file" accept="image/*" onchange="loadImageToSettingsView(event, '.personal-image-view-element')">
                    </label>

                    <div class="setting-values">
                        <div class="form-input-container">
                            <span class="form-input-label">Name</span>
                            <input class="form-input person-name" placeholder="Name" type="text" required>
                        </div>

                        <div class="two-column-grid">
                            <div class="form-input-container">
                                <span class="form-input-label">Phone</span>
                                <input class="form-input person-phone" placeholder="Phone" type="text">
                            </div>

                            <div class="form-input-container">
                                <span class="form-input-label">ID</span>
                                <input class="form-input person-institutionID" placeholder="ID" type="text" disabled>
                            </div>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label">Email</span>
                            <input class="form-input person-email" placeholder="Email" type="text" disabled>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label">Address</span>
                            <input class="form-input person-address" placeholder="Address" type="text">
                        </div>


                        <div class="form-input-container">
                            <span class="form-input-label">Test</span>
                            <input class="form-input person-test" placeholder="save" type="text">
                        </div>

                    </div>

                    <div class="button saveProfileButton" onclick="saveProfileSettings()">
                        <text>Save</text>
                    </div>

                </form>

            </div>
        </div>

        <script>
            localizeInputPlaceholders();
        </script>
    </body>
</html>