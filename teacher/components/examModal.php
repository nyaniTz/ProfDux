<div id="exam-modal" class="exam-modal">
  <div class="exam-modal-content">
    <span id="exam-modal-close" class="exam-modal-close" onclick="closeExamModalTeacher()">&times;</span>
    <h3 class="exam-modal-title">Please select your question types!</h3>
    <form onsubmit="generateExam(event)">
      <div class="exam-modal-container">
        <div class="exam-modal-container-first-div">
          <div class="exam-modal-question-type-box">
            <p>Exam Name</p>
            <input type="text" style="margin-left: 10px;" required id="exam-name-input" />
          </div>
          <div class="exam-modal-question-type-box">
            <p>True / False</p>
            <input type="number" style="margin-left: 10px;" required id="exam-true-false-input" />
          </div>
          <div class="exam-modal-question-type-box">
            <p>Multiple Choices</p>
            <input type="number" style="margin-left: 10px;" required id="exam-multiple-choices-input" />
          </div>
          <div class="exam-modal-question-type-box">
            <p>Matching Questions</p>
            <input type="number" style="margin-left: 10px;" required id="exam-matching-input" />
          </div>
          <div class="exam-modal-question-type-box">
            <p>Fill in the Blank Questions</p>
            <input type="number" style="margin-left: 10px;" required id="exam-fill-in-blank-input" />
          </div>
        </div>
        <div class="exam-modal-container-second-div">
          <h3 class="exam-modal-hardness-title">Hardness Level</h3>
          <div class="exam-modal-hardness-levels">
            <div class="exam-modal-question-type-box">
              <p>Easy Questions</p>
              <input type="number" required id="exam-easy-input" />
            </div>

            <div class="exam-modal-question-type-box">
              <p>Medium Questions</p>
              <input type="number" required id="exam-medium-input" />
            </div>

            <div class="exam-modal-question-type-box">
              <p>Hard Questions</p>
              <input type="number" required id="exam-hard-input" />
            </div>
          </div>
          <div class="exam-modal-minutes">
            <h3 class="exam-modal-hardness-title" style="margin-top:20px">How many minutes will the exam be?</h3>
            <input type="number" style="border:1px solid #6f2036;padding:15px;border-radius:10px;margin-top:15px" required id="exam-minutes-input" />
          </div>
          <div class="exam-modal-date">
            <h3 class="exam-modal-hardness-title" style="margin-top:20px">Select Exam Time</h3>
            <input type="datetime-local" style="border:1px solid #6f2036;padding:15px;border-radius:10px;margin-top:15px" required id="exam-date-input" />
          </div>

        </div>
      </div>
      <div style="display:flex;justify-content:center;align-items:center;">
        <button class="exam-modal-generate-button" style="cursor: pointer;" type="submit">Generate</button>
      </div>
  </div>
  </form>
</div>
</div>