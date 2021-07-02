<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            'post_id' => ['required', 'integer'],
            'body' => ['required', 'string']
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors(), 400]);
        }
        Comments::create([
            'user_id' => $request->input('user_id'),
            'post_id' => $request->input('post_id'),
            'body' => $request->input('body')
        ]);
        return response()->json(['message' => 'comment has been created']);
    }
}