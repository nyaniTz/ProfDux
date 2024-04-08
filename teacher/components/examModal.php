<div id="exam-modal" class="exam-modal">
  <div class="exam-modal-content">
    <span id="exam-modal-close" class="exam-modal-close" onclick="closeExamModal()">&times;</span>
    <h3 class="exam-modal-title">Please select your question types!</h3>
    <div class="exam-modal-container">
      <div class="exam-modal-container-first-div">
        <div class="exam-modal-question-type-box">
          <p>True / False</p>
          <input type="number" />
        </div>
        <div class="exam-modal-question-type-box">
          <p>Multiple Choices</p>
          <input type="number" />
        </div>
        <div class="exam-modal-question-type-box">
          <p>Matching Questions</p>
          <input type="number" />
        </div>
        <div class="exam-modal-question-type-box">
          <p>Fill in the Blank Questions</p>
          <input type="number" />
        </div>
      </div>
      <div class="exam-modal-container-second-div">
        <h3 class="exam-modal-hardness-title">Hardness Level</h3>
        <div class="exam-modal-hardness-levels">
          <p>10</p>
          <p>12</p>
          <p>13</p>
        </div>
        <div class="exam-modal-minutes">
          <h3 class="exam-modal-hardness-title" style="margin-top:20px">How many minutes will the exam be?</h3>
          <input type="number" style="border:1px solid #6f2036;padding:15px;border-radius:10px;margin-top:15px" />
        </div>
        <div class="exam-modal-date">
          <h3 class="exam-modal-hardness-title" style="margin-top:20px">Select Exam Time</h3>
          <input type="date" style="border:1px solid #6f2036;padding:15px;border-radius:10px;margin-top:15px" />
        </div>
        <div style="display:flex;justify-content:center;align-items:center;">
          <button class="exam-modal-generate-button">Generate</button>
        </div>
      </div>
    </div>
  </div>
</div>