<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate(5);
        return response()->json($products, 200);
    }

    public function getProducts($search)
    {
        $products = Product::where('name', 'LIKE', '%' . $search . '%')->paginate();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!auth()->user()->tokenCan('product-store')) abort(401, 'Invalid Credentials');

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:80',
            'category' => 'required|max:150',
            'quantity' => 'required|numeric|max:999999',
            'buy_price' => 'required|max:15',
            'sale_price' => 'required|max:15',
        ]);

        if($validator->fails()) return $this->error('Data Invalid', 422, $validator->errors());

        $created = Product::create($validator->validated());

        if($created) return $this->response('Product Created', 200, $created);

        return $this->error('Something Error', 400);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (Product::where('id', $id)->exists()) {
            $product = Product::find($id);
            return response()->json($product, 200);
        } else {
            return response()->json([
                "message" => "Product not found"
            ], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        if (!auth()->user()->tokenCan('product-update')) abort(401, 'Invalid Credentials');

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:80',
            'category' => 'required|max:150',
            'quantity' => 'required|numeric|max:999999',
            'buy_price' => 'required|max:15',
            'sale_price' => 'required|max:15',
        ]);

        if($validator->fails()) return $this->error('Validation Failed', 422, $validator->errors());

        $validated = $validator->validated();

        $updated = $product->update([
            'name' => $validated['name'],
            'category' => $validated['category'],
            'quantity' => $validated['quantity'],
            'buy_price' => $validated['buy_price'],
            'sale_price' => $validated['sale_price'],
        ]);

        if($updated) return $this->response('Product Updated', 200, $product);

        return $this->error('Something Error', 400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if (!auth()->user()->tokenCan('product-destroy')) abort(401, 'Invalid Credentials');

        $deleted = $product->delete();

        if ($deleted) return $this->response('Product Deleted', 200);

        return $this->error('Something Error', 400);
    }
}
