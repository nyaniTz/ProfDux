<div class="overlay create-exam-overlay">
    <div class="popup">
        <div class="popup-header">
            <div class="close-button" onclick="closePopup('.create-exam-overlay')">
                <img src="../assets/icons/close.png" alt="">
            </div>
            <h1 class="pop-up-title">
                <text>Create A New Exam</text>
            </h1>
        </div>

        <div class="popup-body">
            <form class="course-form simple-grid" style="width: 100%;">
                <div class="form-input-container">
                    <span class="form-input-label"><text>Exam Name</text></span>
                    <input class="form-input exam-name" placeholder="Exam Name" type="text" required>
                </div>

                <div class="two-column-grid">
                    <div class="form-input-container">
                        <span class="form-input-label"><text>Number of Multiple Choice Questions</text></span>
                        <input class="form-input multiple-choice-questions" value="2" placeholder="Number of Multiple Choice Questions" min=0 max=20 type="number" required>
                    </div>

                    <div class="form-input-container">
                        <span class="form-input-label"><text>Number of Fill In The Blanks</text></span>
                        <input class="form-input fill-in-the-blanks" value="2" placeholder="Number of Fill In The Blanks" min=0 max=20 type="number" required>
                    </div>

                    <div class="form-input-container">
                        <span class="form-input-label"><text>Number of True and False</text></span>
                        <input class="form-input true-and-false" value="2" placeholder="Number of True and False" min=0 max=20 type="number" required>
                    </div>
                </div>

                <div class="two-column-grid">
                    <div class="form-input-container">
                        <span class="form-input-label"><text>Exam Duration In Minutes</text></span>
                        <input class="form-input exam-duration" value="60" placeholder="Exam Duration In Minutes" min=0 max=60 type="number" required>
                    </div>

                    <div class="form-input-container">
                        <span class="form-input-label"><text>Hardness Level</text></span>
                        <input class="form-input hardness-level" placeholder="Hardness Level" value="Automatic" type="text" disabled required>
                    </div>
                </div>
            </form>
        </div>

        <div class="create-exam-loader" style="display: none;">
            <div class="sk-fold">
                <div class="sk-fold-cube"></div>
                <div class="sk-fold-cube"></div>
                <div class="sk-fold-cube"></div>
                <div class="sk-fold-cube"></div>
            </div>

            <div class="loader-message">
                creating exam questions
            </div>

            <div class="outer-loading-bar-container">
                <div class="bar-loader-container">
                    <div class="bar-loader-background"></div>
                    <div class="bar-loader"></div>
                </div>
            </div>

            <div class="bar-loader-counter">0 / 0</div>

        </div>

        <div class="popup-footer">
            <div type="submit" class="button create-exam-button">
                <text>Create</text>
            </div>
        </div>
    </div>
</div>