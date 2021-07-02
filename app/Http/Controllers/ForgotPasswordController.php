<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => ['required', 'email:rfc,filter,strict']]);
        $status = Password::sendResetLink($request->only('email'));
        if ($status === Password::RESET_LINK_SENT) return response()->json(['status' => __($status)], 200);
        else return response()->json(['email' => __($status)], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            "email" => ['required', 'email:rfc,filter,strict'],
            "token" => ['required'],
            "password" => ['required', 'confirmed']
        ]);
        $status = Password::reset(
            $request->all(),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );
        if ($status === Password::PASSWORD_RESET) return response()->json(['status' => __($status)]);
        else return response()->json(['email' => __($status)]);
    }
}