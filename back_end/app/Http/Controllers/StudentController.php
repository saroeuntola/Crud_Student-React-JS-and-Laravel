<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class StudentController extends Controller
{
    function __construct(){
        $this->middleware('auth:api', ['except' => ['index' ] ]);
    }
        public function index(){


             $students = Student::all();
             return response()->json($students);

        }

        public function store(Request $request){
            try {
                $validator = Validator::make($request->all(), [
                    'username' =>'required',
                    'sex' =>'required',
                    'phone' =>'required',
                    'email' =>'required',
                ]);
                if ($validator->fails()) {
                    return response()->json($validator->errors(), 400);
                }
                $student = new Student();
                $student->username = $request->username;
                $student->sex = $request->sex;
                $student->phone = $request->phone;
                $student->email = $request->email;
                $student->save();
                return response()->json((['status'=>'true','message' =>'Create success', 'data' => $student]));
            } catch (\Exception $ex) {
                return response()->json((['message' => $ex->getMessage()]));
            }
        }



        public function edit($id)
    {
    try {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        return response()->json(['message' => 'success', 'data' => $student]);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}


        public function update(Request $request, $id){
            try {
                // $requestData["user_id"] = JWTAuth::toUser()->id; //current user login.
                // $requestData = $request->all();
                $validator = Validator::make($request->all(), [
                    'username' =>'required',
                    'sex' =>'required',
                    'phone' =>'required',
                    'email' =>'required',]);
                    if ($validator->fails()) {
                        return response()->json($validator->errors(), 400);
                    }
                $student = Student::find($id);
                $student->username = $request->username;
                $student->sex = $request->sex;
                $student->phone = $request->phone;
                $student->email = $request->email;
                $student->save();
                return response()->json((['message' =>'success', 'data' => $student]));
            }
           catch (\Exception $e) {
            return response()->json((['message' => $e->getMessage()]), 400);
            }
        }

        public function destroy($id){
            $student = Student::find($id);
            if ($student){
                $student->delete();
                return response()->json((['status'=>'True','message' =>'delete success', 'data' => $student]));
            }else{
                return response()->json(['status'=>'Failed', 'message' => 'data not found',]);
            }
        }
}

