<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique(); // For clean URLs like maroon.com/shop/velvet-maroon-hoodie
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2); // Handles prices up to 999999.99
            $table->integer('stock_quantity')->default(0);
            $table->string('image_path')->nullable(); // For storing product images
            $table->string('category'); // e.g., 'clothes' or 'accents'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
