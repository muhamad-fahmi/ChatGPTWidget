$(document).ready(() => {
    var hp = window.matchMedia("(max-width: 400px)");
    var laptop = window.matchMedia("(min-width: 768px)");

    hp.addListener(handleHP);
    handleHP(hp, "uni");

    laptop.addListener(handleLaptop);
    handleLaptop(laptop, "uni");

    $("#bubble_chat_button").click((e) => {
        $("#bubble_chat_popup")
            .show()
            .removeClass("animate__fadeOutDown")
            .removeClass("animate__bounceOut")
            .addClass("animate__bounceIn")
            .addClass("animate__fadeInUp")
            .addClass("popup-opened");
    });

    $("#btn_close_chat_popup").click((e) => {
        $("#bubble_chat_popup")
            .show()
            .removeClass("animate__bounceIn")
            .removeClass("animate__fadeInUp")
            .addClass("animate__fadeOutDown")
            .addClass("animate__bounceOut")
            .removeClass("popup-opened");
    });

    $("#btn_expand_chat_popup").click((e) => {
        // $("#btn_compress_chat_popup").show();
        // $("#btn_expand_chat_popup").hide();
        var hp = window.matchMedia("(max-width: 450px)");
        var laptop = window.matchMedia("(min-width: 768px)");

        hp.addListener(handleHP);
        handleHP(hp, "expand");

        laptop.addListener(handleLaptop);
        handleLaptop(laptop, "expand");
    });

    function handleHP(e, type) {
        if (e.matches) {
            if (type == "expand") {
                $("#bubble_chat_popup").show().addClass("hp");
                if (screenfull.isEnabled) {
                    screenfull.on("change", () => {
                        $("#bubble_chat_popup")
                            .removeClass("fullscreen-laptop")
                            .addClass("fullscreen-hp");
                    });
                    screenfull.request($("#bubble_chat_popup")[0]);
                }
            } else if (type == "compress") {
                $("#bubble_chat_popup").show().addClass("w-75");

                if (screenfull.isEnabled) {
                    screenfull.on("change", () => {
                        $("#bubble_chat_popup")
                            .removeClass("fullscreen-laptop")
                            .removeClass("fullscreen-hp");
                    });
                    screenfull.exit($("#bubble_chat_popup")[0]);
                }
            } else {
                $("#bubble_chat_popup").addClass("hp");
            }
        }
    }

    function handleLaptop(e, type) {
        if (e.matches) {
            if (type == "expand") {
                $("#bubble_chat_popup").show().removeClass("hp");
                // openFullscreen($("#bubble_chat_popup"));
                if (screenfull.isEnabled) {
                    screenfull.on("change", () => {
                        $("#bubble_chat_popup")
                            .removeClass("fullscreen-hp")
                            .addClass("fullscreen-laptop");
                    });
                    screenfull.request($("#bubble_chat_popup")[0]);
                }
            } else if (type == "compress") {
                $("#bubble_chat_popup").show().removeClass("hp");
                if (screenfull.isEnabled) {
                    screenfull.on("change", () => {
                        $("#bubble_chat_popup")
                            .removeClass("fullscreen-laptop")
                            .removeClass("fullscreen-hp");
                    });
                    screenfull.exit($("#bubble_chat_popup")[0]);
                }
            } else {
                $("#bubble_chat_popup").removeClass("hp");
            }
        }
    }

    $("#btn_compress_chat_popup").click((e) => {
        // $("#btn_compress_chat_popup").hide();
        // $("#btn_expand_chat_popup").show();
        var hp = window.matchMedia("(max-width: 400px)");
        var laptop = window.matchMedia("(min-width: 768px)");

        hp.addListener(handleHP);
        handleHP(hp, "compress");

        laptop.addListener(handleLaptop);
        handleLaptop(laptop, "compress");
    });

    $("#btn_send_message").click((e) => {
        const message = $("#message_text").val();

        //generate code req
        const code = "";
        const intruction = "";

        if (code.length > 0) {
            insertChat("me", code);
            $(".msg-content .text-message").addClass("code-text");
            code = $("#message_text.code-text").val();
            insertChat("bot", "Send the intruction :", 1000);
            $("#message_text").removeClass("code").addClass("intruction");
        } else if (intruction.length > 0) {
            // if () {
            intruction = $("#message_text.intruction").val();
            console.log(code);
            console.log(intruction);
            // }
        } else if (message.length > 0) {
            insertChat("me", message);
            $.post(
                route("text_completion"),
                {
                    msg: message,
                },
                function (response, status) {
                    if (response) {
                        if ($("#btn_send_message").hasClass("generate-code")) {
                            response_alocate(response, "generate_code");
                        } else if (
                            $("#btn_send_message").hasClass("modify-code")
                        ) {
                            response_alocate(response, "modify_code");
                        } else {
                            response_alocate(response, "text_completion");
                        }
                    }
                }
            );
        }

        $("#message_text").val("");
    });

    function response_alocate(response, mode) {
        if (containsNumbers(response.response)) {
            console.log(response);
            var bot_response = response.response.replace(
                /^[ \t]*\d+.*/gm,
                '<li class="item">$&</li>'
            );

            console.log(bot_response);
            insertChat(
                "bot",
                `<ol>${(bot_response.replace(/\d+\. /g, ""), "500")}</ol>`,
                mode,
                response.message
            );
        } else {
            var bot_response = response.response.replace(
                /(\n\n|\r|\n)/g,
                "<br>"
            );

            console.log(bot_response);
            insertChat("bot", bot_response, "500", mode, response.message);
        }
    }

    function containsNumbers(str) {
        return /\d+\. /g.test(str);
    }

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

    function insertChat(who, text, time, mode, reply) {
        if (time === undefined) {
            time = 500;
        }
        if (mode === undefined) {
            mode = "text_completion";
        }
        var control = "";
        var date = formatAMPM(new Date());

        if (who == "me") {
            control = `<li class="w-100 mt-3">
                <div class="d-flex flex-row float-right">
                    <div class="msg-content rounded shadow-sm px-2 mr-2 w-auto pt-3 pb-1" style="background-color:lightgray">
                       <p class="my-0 ml-2 text-message">${text}</p>
                       <p class="mt-3 mr-2 text-right mb-0"><small>${date}</small></p>
                    </div>
                    <img src="assets/images/avatar/avatar-user.png" class="rounded-full img-avatar-chat">
                </div>
            </li>`;
        } else {
            if (mode != "text_completion") {
                control = `<li class="w-100 mt-3">
                    <div class="d-flex flex-row">
                        <img src="assets/images/avatar/avatar.gif" class="rounded-full img-avatar-chat">
                        <div class="msg-content bg-light rounded px-2 ml-2 pt-3  pb-1 w-auto shadow-sm">
                            <div class="p-3 rounded" style="background-color: lightgray">
                                <span><i class="fas fa-reply mr-2 text-secondary" style="font-size:10px;"></i></span> ${reply.slice(
                                    0,
                                    50
                                )} ...
                            </div>

                            <p class="my-0 ml-2">${text}</p>
                            <p class="mt-3 mr-2 text-right mb-0"><small>${date}</small></p>
                        </div>
                    </div>
                </li>`;
            } else {
                control = `<li class="w-100 mt-3">
                    <div class="d-flex flex-row">
                        <img src="assets/images/avatar/avatar.gif" class="rounded-full img-avatar-chat">
                        <div class="msg-content bg-light rounded px-2 ml-2 pt-3  pb-1 w-auto shadow-sm">
                            <p class="my-0 ml-2">${text}</p>
                            <p class="mt-3 mr-2 text-right mb-0"><small>${date}</small></p>
                        </div>
                    </div>
                </li>`;
            }
        }
        setTimeout(() => {
            $("ul").append(control).scrollTop($("ul").prop("scrollHeight"));
        }, time);
    }

    $("#code_completion").click((e) => {
        var date = formatAMPM(new Date());
        var button = `<li class="w-100 mt-3">
                <div class="d-flex flex-row">
                    <img src="assets/images/avatar/avatar.gif" class="rounded-full img-avatar-chat">
                    <div class="msg-content bg-light rounded px-2 ml-2 pt-3  pb-1 w-auto shadow-sm">
                        <p class="mb-2">Choose below options!</p>
                        <div class="list-group mb-2 list-group-flush">
                            <button type="button" class="list-group-item list-group-item-action py-1 px-2" id="generate_code">
                                <i class="fas fa-code mr-2"></i> Generate Code
                            </button>
                            <button type="button" class="list-group-item list-group-item-action py-1 px-2" id="modify_code">
                                <i class="fas fa-code mr-2"></i> Modify Code
                            </button>
                        </div>
                        <p class="mt-3 mr-2 text-right mb-0"><small>${date}</small></p>
                    </div>
                </div>
            </li>`;
        $("ul").append(button).scrollTop($("ul").prop("scrollHeight"));

        $("#generate_code").click((e) => {
            $("#btn_send_message")
                .removeClass("modify-code")
                .addClass("generate-code");
            insertChat("me", "Generate  Code");

            insertChat("bot", "Send the intruction :", 2000);
        });

        $("#modify_code").click((e) => {
            $("#btn_send_message")
                .removeClass("generate-code")
                .addClass("modify-code");

            insertChat("me", "Modify Code");

            insertChat("bot", "Send the code :", 2000);
        });
    });
});
