<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Messaging"></page> 

        <?php include '../include/teacherImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>

            <div class="main-container">

                <h1 class="large-title">Messaging</h1>
                               
                <div class="tab-container-view">

                    <div class="tab-header">
                        <div class="header-tab active" data-for="direct-messages">
                            <text>Direct Messages</text>
                        </div>
                        <div class="header-tab" data-for="class-announcements">
                            <text>Class Announcements</text>
                        </div>
                    </div>
                        
                    <div class="tab-body" data-for="direct-messages">
                        
                        <div class="create-new-message-area">
                            <p>Click this button to send a direct message</p>
                            <div class="button" onclick="openPopup('.send-direct-messsage-overlay')">New Message</div>
                        </div>

                        <div class="messages-container" id="directMessageRenderContainer">
                            <p class="empty-message-view">
                                You currently have no messages
                            </p>
                        </div>
                    </div>

                    <div class="tab-body" data-for="class-announcements">    
                        <div class="create-new-message-area">
                            <p>Click this button to send an announcement</p>
                            <div class="button" onclick="openPopup('.send-announcement-overlay')">New Announcement</div>
                        </div>

                        <div class="messages-container" id="announcementRenderContainer">
                            <p class="empty-message-view">
                                You currently have no messages
                            </p>
                        </div>   
                    </div>
                </div>
            </div>

        </div>

        <?php include 'components/messagesOverlays.php' ?>


        <script>

            function clearTextContent(elementSelector){
                const element = document.querySelector(elementSelector);
                element.textContent = "";
            }

            (async() => {

                const { id: senderID } = await getGlobalDetails();

                const messageObject = {
                    type: "direct",
                    senderID
                }

                let directMessagingEngine = new Messaging(messageObject);
                const messageContainer = document.querySelector("#directMessageContainer");
                const limitElement = document.querySelector("#directMessageLimit");
                const sendMessageButton = document.querySelector("#directMessageSendButton");
                const directMessageRenderContainer = document.querySelector("#directMessageRenderContainer");

                const messageViewSender = document.querySelector("#messageViewSender");
                const messageViewContainer = document.querySelector("#messageViewContainer");
                const loader = document.querySelector("#sendDirectMessageLoader");
                const directMessageFilterContainer = document.querySelector("#directMessageFilterContainer");

                //TODO: reset event listeners.

                directMessagingEngine.setMessageContainer(messageContainer);
                directMessagingEngine.setSendMessageButton(sendMessageButton);
                directMessagingEngine.setMessageRenderContainer(directMessageRenderContainer);
                directMessagingEngine.setLimitElement(limitElement);

                directMessagingEngine.setMessageViewSender(messageViewSender);
                directMessagingEngine.setMessageViewContainer(messageViewContainer);
                directMessagingEngine.setLoader(loader);
                directMessagingEngine.setMessageFilterContainer(directMessageFilterContainer);


                // Announcement

                const announcementObject = {
                    type: "announcement",
                    senderID
                }

                let announcementEngine = new Messaging(announcementObject);
                const announcementMessageContainer = document.querySelector("#announcementContainer");
                const announcementLimitElement = document.querySelector("#announcementLimit");
                const announcementSendMessageButton = document.querySelector("#announcementSendButton");
                const announcementRenderContainer = document.querySelector("#announcementRenderContainer");

                const announcementViewSender = document.querySelector("#messageViewSender");
                const announcementViewContainer = document.querySelector("#messageViewContainer");
                const announcementLoader = document.querySelector("#sendAnnouncementLoader");
                const announcementFilterContainer = document.querySelector("#announcementFilterContainer");
                //TODO: reset event listeners.

                announcementEngine.setMessageContainer(announcementMessageContainer);
                announcementEngine.setSendMessageButton(announcementSendMessageButton);
                announcementEngine.setMessageRenderContainer(announcementRenderContainer);
                announcementEngine.setLimitElement(announcementLimitElement);

                announcementEngine.setMessageViewSender(announcementViewSender);
                announcementEngine.setMessageViewContainer(announcementViewContainer);
                announcementEngine.setLoader(announcementLoader);
                announcementEngine.setMessageFilterContainer(announcementFilterContainer);

            })();

        </script>
    </body>
</html>