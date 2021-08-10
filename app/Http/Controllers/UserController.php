<?php

namespace App\Http\Controllers;

use App\Events\OnlineUser;
use App\Mail\WelcomeEmail;
use App\Models\User;
use App\Models\MessageNotification;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Throwable;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['posts', 'likes'])->get();
        return response()->json($users, 200);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'email' => ['required', 'email:rfc,filter,strict', 'unique:users'],
            'password' => ['required', 'confirmed']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $password = Hash::make($request->password);
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $password,
        ]);
        Mail::to($request->email)->send(new WelcomeEmail($user));
        $token = $user->createToken('token', [$request->input('password')])->plainTextToken;
        $user->token = $token;
        $user->save();
        return response()->json(['user' => $user, 'token' => $token, 'message' => 'user created'], 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email:rfc,filter,strict'],
            'password' => ['required'],
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::where('email', $request->input('email'))->first();
        if ($user) {
            $hasher = Hash::check($request->input('password'), $user->password);
            if ($hasher) {
                $user->login_time = now();
                $user->save();
                broadcast(new OnlineUser($user))->toOthers();
                return response()->json(['user' => $user], 200);
            } else return response()->json(['message' => 'login attempt failed'], 400);
        } else return response()->json(['message' => 'unauthenticated attempt to login'], 400);
    }

    public function logOut()
    {
        try {
            $user_id = Auth::id();
            $user = User::where('id', $user_id)->first();
            $user->logout_time = now();
            $user->save();
            broadcast(new OnlineUser($user))->toOthers();
            return response()->json(['message' => 'Logout successfully'], 200);
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function change(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => ['required'],
            'password' => ['required', 'confirmed']
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::where('id', Auth::id())->first();
        if ($user) {
            $check_password = Hash::check($request->input('old_password'), $user->password);
            if ($check_password) {
                $hashed_password = Hash::make($request->input('password'));
                $user->password = $hashed_password;
                $user->save();
                return response()->json(['message' => 'Password has been changed'], 200);
            }
            return response()->json(['message' => 'your old password does not match'], 400);
        }
        return;
    }
    public function getUser(Request $request)
    {
        $user = User::where('id', Auth::id())->with(['notifications', 'messages'])->first();
        $user_message = MessageNotification::where('reciever', $user->id)->with(['message'])->get();
        return response()->json(['user' => $user, 'user_message' => $user_message], 200);
    }
}