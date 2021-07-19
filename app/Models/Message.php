<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'is_read',
        'thread_id',
        'user_id',

    ];

    public function thread()
    {
        return $this->belongsTo(Thread::class, 'thread_id');
    }
}