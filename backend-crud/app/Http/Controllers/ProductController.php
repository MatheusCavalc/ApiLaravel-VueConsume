<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
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
        $products = Product::where('name', 'LIKE','%'.$search.'%')->paginate();
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
        $response = [];
        $validation = $this->validation($request->all());
        if (!is_array($validation)) {
            Product::create($request->all());
            array_push($response, ['status' => 'success']);
            return response()->json($response, 200);
        } else {
            return response()->json($validation, 400);
        }
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
    public function update(Request $request, $id)
    {
        $response = [];
        $validation = $this->validation($request->all());
        if (!is_array($validation)) {
            $product = Product::find($id);
            if ($product) {
                $product->fill($request->all())->save();
                array_push($response, ['status' => 'success']);
            } else {
                array_push($response, ['status' => 'error']);
                array_push($response, ['errors' => ['id' => ['Products not found']]]);
            }
            return response()->json($response);
        } else {
            return response()->json($validation);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (Product::where('id', $id)->exists()) {
            $product = Product::find($id);
            $product->delete();
            return response()->json([
                "message" => "Product deleted"
            ], 202);
        } else {
            return response()->json([
                "message" => "Product not found"
            ], 404);
        }
    }
    public function validation($params)
    {
        $response = [];
        $messages = [
            'max' => 'The :attribute field must NOT have more than :max characters',
            'required' => 'The :attribute field must NOT be empty',
            'quantity.numeric' => ':attribute must be numeric'
        ];
        $attributes = [
            'name' => 'name',
            'category' => 'category',
            'quantity' => 'quantity',
            'buy_price' => 'buy_price',
            'sale_price' => 'sale_price'
        ];
        $validation = Validator::make(
            $params,
            [
                'name' => 'required|max:80',
                'category' => 'required|max:150',
                'quantity' => 'required|numeric|max:999999',
                'buy_price' => 'required|max:15',
                'sale_price' => 'required|max:15',
            ],
            $messages,
            $attributes
        );

        if ($validation->fails()) {
            array_push($response, ['status' => 'error']);
            array_push($response, ['errors' => $validation->errors()]);
            return $response;
        } else {
            return true;
        }
    }
}
