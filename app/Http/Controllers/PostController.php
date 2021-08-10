<?php

namespace App\Http\Controllers;

use App\Events\UpdatePostMessage;
use App\Models\Post;
use App\Mail\WelcomeEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with(['likes', 'user', 'comments.user',])->get();
        return response()->json($posts, 200);
    }

    public function getPost($id)
    {
        $post = Post::with(['user'])->findOrFail($id);
        return response()->json($post, 200);
    }

    public function likePost(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => ['required', 'integer']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user_id = $request->input('user_id');
        $post = Post::with('likes')->findOrFail($id);
        function is_liked($id, $array)
        {
            foreach ($array as $value) {
                if ($value->id == $id) return true;
                return false;
            }
        }
        if ($post) {
            $result = is_liked($user_id, $post->likes);
            if (!$result) {
                $post->likes()->attach($user_id);
                return response()->json(['message' => 'user has liked the post'], 200);
            }
            $post->likes()->detach($user_id);
            return response()->json(['message' => 'user has disliked this post'], 200);
        } else {
            return response()->json(['message' => 'post not found'], 400);
        }
    }
    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required'],
            'body' => ['required', 'min:20'],
            'user_id' => ['required', 'integer']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->user_id = $request->input('user_id');
        $post->save();
        return response()->json(['message' => 'Post has been updated'], 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required'],
            'body' => ['required'],
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $photo = $request->file('image')->getClientOriginalName();
        $post = Post::create([
            'title' => $request->input('title'),
            'body' => $request->input('body'),
            'image' => $request->file('image')->storeAs('post_images', $photo, 'public'),
            'user_id' => Auth::id()
        ]);
        broadcast(new UpdatePostMessage($post))->toOthers();
        foreach (User::all() as $user) {
            if ($user->id == Auth::id()) continue;
            $user->notifications()->create([
                'subject' => Auth::user()->name . ' created a post',
                'body' => Auth::user()->name . ' created a post with the title' . $post->title,
                'is_read' => false,
            ]);
        }
        return response()->json(['message' => 'Post has been created', 'post' => $post], 201);
    }

    public function delete($id)
    {
        Post::destroy($id);
        return response()->json(['message' => 'post has been deleted'], 200);
    }
}