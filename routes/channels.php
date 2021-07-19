<?php

use App\Models\Message;
use App\Models\Thread;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('post-message', function ($user) {
    if (Auth::check()) {
        return ['name' => $user->name];
    }
});

Broadcast::channel('online-users', function ($user) {
    if (Auth::check()) {
        return ['name' => $user->name];
    }
});

Broadcast::channel('offline-users', function ($user) {
    if (Auth::check()) {
        return ['name' => $user->name];
    }
});


Broadcast::channel('thread.{threadId}', function ($user) {
    // if (Auth::check()) {
    //     return true;
    // }
    return true;
});