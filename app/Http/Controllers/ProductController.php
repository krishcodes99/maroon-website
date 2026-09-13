<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Store a newly created product in the database (Admin action).
     */
    public function store(Request $request)
    {
        // 1. Validate the incoming request data from the frontend form
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category' => 'required|string|in:clothes,accents', // restricts to your two categories
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // 2. Automatically generate the URL slug from the product name
        $validated['slug'] = Str::slug($request->name) . '-' . time(); // adds a timestamp to guarantee uniqueness

        // 3. Handle File Upload if an image exists
        if ($request->hasFile('image')) {
            // This stores the image inside storage/app/public/products
            $path = $request->file('image')->store('products', 'public');
            
            // This saves the clean path name to the database (e.g., "products/filename.jpg")
            $validated['image_path'] = $path;
        }

        // 4. Save the product record
        Product::create($validated);

        return redirect()->back()->with('success', 'Product added successfully!');
    }
}
