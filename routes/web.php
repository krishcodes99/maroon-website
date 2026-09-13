<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    // Fetch absolutely every product to list on the management deck
    $allProducts = Product::all();

    return Inertia::render('Dashboard', [
        'products' => $allProducts
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/maroon', function () {
    return Inertia::render('MaroonHome', [
        'projectName' => 'Maroon',
        'version' => '1.0.0'
    ]);
});

Route::post('/admin/products', [ProductController::class, 'store'])->name('products.store');
Route::get('/admin/products/create', function () {
    return Inertia::render('Admin/CreateProduct');
});

Route::get('/shop', function () {
    // Pull only products that are NOT categorized as accents (e.g., clothes, shirts, pants)
    $clothingProducts = Product::where('category', '!=', 'accents')->get();

    return Inertia::render('Shop', [
        'products' => $clothingProducts
    ]);
});

Route::get('/accents', function () {
    // Query SQLite to pull only items belonging to the accents collection
    $accentProducts = Product::where('category', 'accents')->get();

    // Render our upcoming Accents React page component
    return Inertia::render('Accents', [
        'products' => $accentProducts
    ]);
});

// 1. Route to show the edit page with the product data loaded
Route::get('/admin/products/{product}/edit', function (\App\Models\Product $product) {
    return Inertia::render('Admin/EditProduct', [
        'product' => $product
    ]);
})->name('products.edit');

// 2. Route to handle the form submission update
Route::post('/admin/products/{product}', function (Illuminate\Http\Request $request, \App\Models\Product $product) {
    // Validate incoming data
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'category' => 'required|string',
        'image' => 'nullable|image|max:2048', // 2MB Max
    ]);

    // Handle new image upload if present
    if ($request->hasFile('image')) {
        // Optional: Delete old file from storage if you want to keep it clean
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }
        $validated['image_path'] = $request->file('image')->store('products', 'public');
    }

    // Update the product record
    $product->update($validated);

    // Redirect back to wherever you manage your store items
    return redirect('/shop')->with('success', 'Product updated successfully!');
});

// Add this route to routes/web.php to handle product removals
Route::delete('/admin/products/{product}', function (Product $product) {
    // Delete the image asset if it exists to preserve space
    if ($product->image_path) {
        Storage::disk('public')->delete($product->image_path);
    }
    
    $product->delete();

    return redirect('/dashboard')->with('success', 'Product deleted successfully!');
});

//Products Details Page
Route::get('/products/{product}', function (Product $product) {
    return Inertia::render('ProductShowcase', [
        'product' => $product
    ]);
})->name('products.show');


//CART
// 1. Post Route: Adds items to database if logged in, or rejects unauthenticated visitors
Route::post('/cart/add', function (Request $request) {
    if (!Auth::check()) {
        return redirect()->route('login');
    }

    $validated = $request->validate([
        'product_id' => 'required|exists:products,id',
        'size'       => 'required|string',
        'quantity'   => 'required|integer|min:1',
    ]);

    // Check if this exact item/size combo is already in their bag
    $existing = CartItem::where('user_id', Auth::id())
        ->where('product_id', $validated['product_id'])
        ->where('size', $validated['size'])
        ->first();

    if ($existing) {
        $existing->increment('quantity', $validated['quantity']);
    } else {
        CartItem::create([
            'user_id'    => Auth::id(),
            'product_id' => $validated['product_id'],
            'size'       => $validated['size'],
            'quantity'   => $validated['quantity'],
        ]);
    }

    return redirect()->route('cart.index');
});

// 2. View Route: Pulls combined cart data for the checkout screen
Route::get('/bag', function () {
    if (!Auth::check()) {
        return redirect()->route('login');
    }

    // Eager load the product relationships cleanly
    $items = CartItem::where('user_id', Auth::id())->with('product')->get();

    return Inertia::render('ShoppingBag', [
        'cartItems' => $items
    ]);
})->name('cart.index');

Route::delete('/cart/{cartItem}', function (CartItem $cartItem) {
    // Ensure users can only delete their own cart items
    if ($cartItem->user_id === Auth::id()) {
        $cartItem->delete();
    }
    
    return redirect()->back();
})->name('cart.destroy');

require __DIR__.'/auth.php';
