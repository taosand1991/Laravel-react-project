<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessageNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('message_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('thread_id')->constrained()->onDelete('cascade');
            $table->foreignId('message_id')->constrained()->onDelete('cascade');
            $table->integer('sender')->unsigned();
            $table->integer('reciever')->unsigned();
            $table->foreign('sender')->references('id')->on('users')->constrained()->onDelete('cascade');
            $table->foreign('reciever')->references('id')->on('users')->constrained()->onDelete('cascade');
            $table->mediumText('message_body');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('message_notifications');
    }
}
