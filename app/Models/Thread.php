<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_user',
        'second_user',
        'name',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class, 'thread_id');
    }
}