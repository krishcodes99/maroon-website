<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    // Allow Laravel to insert data safely into these columns
    protected $fillable = [
        'user_id',
        'product_id',
        'size',
        'quantity'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
