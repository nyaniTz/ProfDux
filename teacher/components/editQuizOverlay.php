<div class="overlay edit-assessment-overlay">
    <div class="popup quiz-popup">
        <div class="popup-header">
            <div class="button save-button">Save and Close</div>
            <h1 class="pop-up-title">
            <div class="two-column-grid">
                <div class="quiz-details">Quiz</div>
                <div class="assessment-language-changer"></div>
            </div> 
            </h1> 
        </div>

        <div class="popup-body quiz-popup-body">

            <div class="question-header">
                
            </div>

            <div class="question-area">
                
            </div>
        </div>

        <div class="popup-footer button-group-footer">
            <div class="button-group edit-quiz-button-group">
                <button class="button previous-question" disabled>Previous Question</button>
                <div class="grid-view-button">
                    <img src="../assets/icons/grid.png" alt="">
                </div>
                <button class="button next-question">Next Question</button>
            </div>
        </div>
    </div>
</div>

<div class="overlay language-changer-overlay">

    <div class="safe-element-padding">

        <div class="close-button" onclick="
            closePopup('.language-changer-overlay');
            ">
                <img src="../assets/icons/close.png" alt="">
        </div>

        <div class="language-changer-container">
            <div class="language-changer-element" data-lang="english">English</div>
            <div class="language-changer-element" data-lang="turkish">Turkish</div>
        </div>
    </div>

</div>