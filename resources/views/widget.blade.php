@extends('layouts.app')

@push('styles')
    <style>
        .bubble-chat-popup:after{
            width: 0;
            height: 0;
            content:"";
            bottom: 0;
            right: -13px;
            position: fixed;
            border-style: solid;
            border-width: 15px 15px 15px 0;
            border-color: {{ $theme_color ?? '#0b91f6' }} transparent transparent transparent;
        }
    </style>
@endpush

@section('contents')
    <div class="bubble-chat-widget d-flex align-items-end fixed-bottom pr-4 pb-4">

        <div id="bubble_chat_popup" class="bubble-chat-popup shadow w-25 ml-auto rounded-top rounded-left animate__animated"  style="background-color:{{ $theme_color ?? '#0b91f6' }}">
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
                    <div class="bot-close ml-auto d-flex">
                        <button class="d-flex align-items-center mr-2" id="btn_expand_chat_popup">
                            <i class="fas fa-expand text-light"></i>
                        </button>
                        <button class="d-flex align-items-center mr-2" id="btn_compress_chat_popup">
                            <i class="fas fa-compress text-light"></i>
                        </button>
                        <button class="d-flex align-items-center" id="btn_close_chat_popup">
                            <i class="fas fa-times text-center text-light"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="credit-to p-1 overflow-auto">
                <small>
                    <center>Chat GPT Bot Widget By <a href="https://muhamad-fahmi.github.io">Muhamad Fahmi</a></center>
                </small>
            </div>
            <div class="bubble-chat-body bg-light p-1 overflow-auto">
                <ul id="messages"></ul>
            </div>
            <div class="bubble-chat-footer p-2 d-flex">
                <div class="btn-group mr-2">
                    <button type="button" class="btn dropdown-toggle text-light" data-toggle="dropdown" aria-expanded="false" style="background-color:{{ $button_color ?? '#0b91f6' }}">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" id="text_completion">Text Completion (default)</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" id="code_completion">Code Completion</a>
                    </div>
                </div>

                <form onSubmit="return false;" class="w-100">
                    <div class="d-flex flex-col">
                            <input type="text" class="form-control w-100" id="message_text" placeholder="Type a message" autocomplete="off">
                            <button class="ml-2 btn text-light" id="btn_send_message" style="background-color:{{ $button_color ?? '#0b91f6' }}">Send</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- button chat-->
        <div id="bubble_chat_button" class="bubble-chat-button ml-auto shadow" style="background-color:{{ $button_color ?? '#0b91f6' }}">
            <img
                src="{{ asset('assets/images/avatar/chat-bubble.png') }}"
                alt="chat gpt widget button"
                class="bubble-button-img rounded-full">
        </div>


    </div>
@endsection
