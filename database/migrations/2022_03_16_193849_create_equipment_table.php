<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEquipmentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('equipment_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('mask');
            $table->timestamps();
        });

        Schema::create('equipment', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('equipment_type_id');
            $table->string('serial_number')->unique();
            $table->longText('note')->nullable();
            $table->foreign('equipment_type_id')->references('id')->on('equipment_types')->onDelete('cascade');
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
        Schema::table('equipment', function (Blueprint $table) {
            $table->dropForeign('equipment_type_id');
        });
        Schema::dropIfExists('equipment');

        Schema::dropIfExists('equipment_types');
    }
}
