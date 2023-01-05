@extends('layouts.app')

@section('contents')
    <div class="bubble-chat-widget d-flex align-items-end fixed-bottom pr-4 pb-4">

        <div class="bubble-chat-popup shadow w-25 bg-primary ml-auto rounded-top rounded-left">
            <div class="bubble-chat-header p-2">
                <div class="bot-profile d-flex flex-col align-items-center">
                    <div class="bot-picture">
                        <img
                            src="{{ asset('assets/images/avatar/avatar.gif') }}"
                            alt="picture chat bot"
                            class="rounded-full">
                    </div>
                    <div class="bot-name ml-2 text-light">
                        <b>ChatGPT</b>
                    </div>
                    <div class="bot-close ml-auto">
                        <button class="d-flex align-items-center">
                            <i class="fas fa-times text-center text-light"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="bubble-chat-body bg-light p-1 overflow-auto">
                <ul id="messages"></ul>
            </div>
            <div class="bubble-chat-footer p-2">
                <div class="d-flex flex-col">
                    <input type="text" class="form-control" id="message_text" required>
                    <button class="ml-2 btn btn-primary" id="btn_send_message">Send</button>
                </div>
            </div>
        </div>

        <!-- button chat-->
        <div class="bubble-chat-button ml-4 shadow">
            <img
                src="{{ asset('assets/images/avatar/avatar-buble.jpg') }}"
                alt="chat gpt widget button"
                class="bubble-button-img rounded-full">
        </div>


    </div>
@endsection
