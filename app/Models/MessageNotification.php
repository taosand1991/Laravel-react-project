<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageNotification extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function sender()
    {
        return $this->belongsTo(User::class, 'id', 'sender');
    }

    public function reciever()
    {
        return $this->belongsTo(User::class, 'id', 'reciever');
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    public function message() 
    {
        return $this->belongsTo(Message::class, 'message_id');
    }
}
