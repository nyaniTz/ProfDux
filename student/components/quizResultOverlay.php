<div class="overlay review-quiz-overlay">
    <div class="popup quiz-popup">
        <div class="popup-header">
            <div class="close-button" onclick="
            closePopup('.review-quiz-overlay');
            ">
                <img src="../assets/icons/close.png" alt="">
            </div>
            <h1 class="pop-up-title">
                <div class="quiz-details">Quiz Results</div>
            </h1> 
        </div>

        <div class="popup-body quiz-results-body" style="display:none">
            <h1>Your Results</h1>

            <div class="quiz-result-area">
                <div class="total-quiz-mark">
                    <div class="text-divider">
                        <text>Total Quiz Marks</text>
                        <p>:</p>
                    </div>
                    <p class="total-quiz-mark-placeholder">0</p>
                </div>

                <div class="earned-quiz-mark">
                    <div class="text-divider">
                        <text>Score</text>
                        <p>:</p>
                    </div>
                    <p class="earned-quiz-mark-placeholder">0</p>
                </div>
            </div>
        </div>

        <div class="loader-view review-quiz-loader">
            <div>
                <div class="sk-fold">
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                </div>
                <!-- <p>TODO: ...</p> -->
            </div>
        </div>

    </div>
</div>