<?php

namespace App\Http\Controllers\Auth\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use HttpResponses;

    public function register(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:30',
            'email' => 'required|email|unique:users|max:50',
            'password' => 'required|min:8'
        ]);

        if ($validator->fails()) return $this->error('Data Invalid', 422, $validator->errors());

        $userData = $request->only('name', 'email', 'password');
        $userData['password'] = bcrypt($userData['password']);

        if (!$user = $user->create($userData))
            abort(500, 'Error to create a new user...');

        return $this->response('User Registered', 200, $user);
    }
}
