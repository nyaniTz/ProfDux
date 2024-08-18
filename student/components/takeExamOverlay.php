<div class="overlay take-exam-overlay">
    <div class="popup exam-popup">
        <div class="popup-header">
            <h1 class="pop-up-title">
                <div class="quiz-details"><text>Exam</text></div>
            </h1> 
        </div>

        <div class="popup-body exam-popup-body">

            <div class="question-header">
                
            </div>

            <div class="question-area">
                
            </div>
        </div>

        <div class="popup-body exam-results-body">
            <h1>Your Results</h1>

            <div class="exam-result-area">
                <div class="total-exam-mark">
                    <div class="text-divider">
                        <text>Total Quiz Marks</text>
                        <p>:</p>
                    </div>
                    <p class="total-exam-mark-placeholder">0</p>
                </div>

                <div class="earned-exam-mark">
                    <div class="text-divider">
                        <text>Score</text>
                        <p>:</p>
                    </div>
                    <p class="earned-exam-mark-placeholder">0</p>
                </div>
            </div>

            <div class="button" onclick="
            closePopup('.take-exam-overlay');
            ">Done</div>
        </div>

        <div class="popup-footer button-group-footer">
            <div class="button-group exam-button-group">
                <button class="button previous-question" disabled>Previous Question</button>
                <button class="button next-question">Next Question</button>
            </div>
        </div>

        <div class="popup-footer submit-footer">
            <button class="button finish-exam-button">Submit Quiz</button>
        </div>


        <div class="loader-view take-exam-loader">
            <div>
                <div class="sk-fold">
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                    <div class="sk-fold-cube"></div>
                </div>
                <p>...</p>
            </div>
        </div>

    </div>
</div>