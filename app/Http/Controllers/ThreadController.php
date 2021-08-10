<?php

namespace App\Http\Controllers;

use App\Events\PublishMessages;
use Illuminate\Http\Request;
use App\Models\Thread;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ThreadController extends Controller
{
    public function list()
    {
        $threads = Thread::where('first_user', Auth::id())
            ->orWhere('second_user', Auth::id())
            ->orderBy('created_at', 'desc')->with(['messages', 'first_user', 'second_user'])->get();
        return response()->json($threads, 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_user' => ['required', 'integer'],
            'second_user' => ['required', 'integer'],
            'name' => ['required'],
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }
        $first_user = $request->input('first_user');
        $second_user = $request->input('second_user');
        $old_thread = Thread::where('first_user', $first_user)->where('second_user', $second_user)
            ->orWhere(function ($query) use ($first_user, $second_user) {
                $query->where('first_user', $second_user)->where('second_user', $first_user);
            })->with(['messages'])->first();
        if ($old_thread) {
            foreach ($old_thread->messages as $message) {
                $message->is_read = true;
                $message->save();
            }
            return response()->json(['message' => 'found the thread', $old_thread]);
        }
        $thread = Thread::firstOrCreate([
            'first_user' => $request->input('first_user'),
            'second_user' => $request->input('second_user'),
            'name' => $request->input('name')
        ]);
        $thread_messages = Thread::where('id', $thread->id)->with(['messages'])->first();
        return response()->json(['message' => 'Thread has been created ', $thread_messages], 200);
    }

    public function create_message(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'message' => ['required'],
            'user_id' => ['required'],
            'thread_id' => ['required']
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 400);
        }
        $thread = Thread::where('id', $id)->with(['messages'])->first();
        $thread_messages = $thread->messages()->create([
            'message' => $request->input('message'),
            'user_id' => $request->input('user_id'),
            'thread_id' => $request->input('thread_id'),
            'is_read' => $request->input('is_read')
        ]);
        $thread_reciever = $thread->first_user == Auth::id() ? $thread->second_user : $thread->first_user;
        $thread_notification = $thread->notifications()->create([
            'sender' => Auth::id(),
            'reciever' => $thread_reciever,
            'message_id' => $thread_messages->id,
            'message_body' => Auth::user()->name . ' ' . 'sent you a message'
        ]);
        broadcast(new PublishMessages($thread));
        return response()->json(['message' => 'message created', $thread_messages], 201);
    }
}