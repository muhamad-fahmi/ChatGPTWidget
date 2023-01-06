<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tectalic\OpenAi\Authentication;
use Tectalic\OpenAi\ClientException;
use Tectalic\OpenAi\Manager;
use Tectalic\OpenAi\Models\Completions\CreateRequest;

class BotController extends Controller
{

    public function widget(Request $request) {
        $button_color = urldecode($request->button_color);
        $theme_color = urldecode($request->theme_color);
        return view('widget', compact('button_color', 'theme_color'));
    }

    public function text_completion(Request $request){
        $openaiClient = Manager::build(new \GuzzleHttp\Client(), new Authentication(env('OPENAI_API_KEY')));

        try{
            $response = $openaiClient->completions()->create(
                new CreateRequest([
                    'model'  => 'text-davinci-003',
                    'prompt' => $request->msg,
                    'temperature' => 0,
                    'max_tokens' => 2000
                ])
            )->toModel();

            return response()->json([
                'status' => true,
                'message' => $request->msg,
                'response' => $response->choices[0]->text,
            ]);
        } catch(ClientException $e) {
            return response()->json([
                'status' => false,
                'msg' => $e->getMessage(),
            ]);
        }

    }
}
