$(document).ready(() => {
    $("#btn_send_message").click((e) => {
        const message = $("#message_text").val();
        if (message.length > 0) {
            insertChat("me", message);
            $.post(
                route("text_completion"),
                {
                    msg: message,
                },
                function (response, status) {
                    if (response) {
                        console.log(response);
                        insertChat(
                            "bot",
                            response.response.replace(/(\n\n|\r|\n\n)/g, "<br>")
                        );
                    }
                }
            );
        }
    });

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }

    function insertChat(who, text, time) {
        if (time === undefined) {
            time = 500;
        }
        var control = "";
        var date = formatAMPM(new Date());

        if (who == "me") {
            control = `<li class="w-100 mt-3">
                <div class="d-flex flex-row">
                    <div class="msg-content bg-primary rounded shadow-sm p-1 text-light mr-2 w-100">
                       <p class="my-0 ml-2">${text}</p>
                    </div>
                    <img src="../assets/images/avatar/avatar-user.png" class="rounded-full img-avatar-chat">
                </div>
            </li>`;
        } else {
            control = `<li class="w-100 mt-3">
                <div class="d-flex flex-row">
                    <img src="../assets/images/avatar/avatar.gif" class="rounded-full img-avatar-chat">
                    <div class="msg-content bg-light rounded p-1 ml-2 w-100 shadow-sm">
                       <p class="my-0 ml-2">${text}</p>
                    </div>
                </div>
            </li>`;
        }
        setTimeout(() => {
            $("ul").append(control).scrollTop($("ul").prop("scrollHeight"));
        }, time);
    }
});
