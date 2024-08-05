<div class="overlay send-direct-messsage-overlay">
    <div class="popup send-direct-messsage-popup">
        <div class="popup-header">
            <div class="close-button" onclick="closePopup('.send-direct-messsage-overlay'); clearTextContent('#directMessageContainer'); clearTextContent('#directMessageLimit')">
                <img src="../assets/icons/close.png" alt="">
            </div>
            <h2 class="pop-up-title">
                <text>Send Message</text>
            </h2> 
        </div>

        <div class="popup-body send-direct-messsage-popup-body">

            <div class="loader-view" id="sendDirectMessageLoader" style="display: none;">
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

            
            <div class="simple-grid">

                <div class="limit" id="directMessageLimit"></div>
                <div class="form-input-container">
                    <span class="form-input-label">To</span>
                    <div class="in-type-input" id="directMessageFilterContainer">
                        <input type="text" class="form-input" placeholder="Person's Name" required>
                        <div class="parent-task filter-list">
                        </div>
                    </div>
                </div>
                
                <div style="position: relative;">
                    <div class="message-container" id="directMessageContainer" contenteditable=""></div>
                
                    <div class="send-message-button" id="directMessageSendButton">
                        <img src="../assets/icons/send.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="overlay view-messsage-overlay">
    <div class="popup view-messsage-popup">
        <div class="popup-header">
            <div class="close-button" onclick="closePopup('.view-messsage-overlay')">
                <img src="../assets/icons/close.png" alt="">
            </div>
            <h2 class="pop-up-title">
                <text>Message</text>
            </h2> 
        </div>

        <div class="popup-body send-direct-messsage-popup-body">
            <div class="simple-grid">
                <div class="form-input-container">
                    <span class="form-input-label">From</span>
                    <input type="text" class="form-input" id="messageViewSender" disabled>
                </div>
                
                <div style="position: relative;">
                    <div class="message-container review" id="messageViewContainer"></div>
                </div>
            </div>
        </div>
    </div>
</div>