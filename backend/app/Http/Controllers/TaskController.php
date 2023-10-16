<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return Task::select('id', 'task', 'status', 'created_at', 'updated_at')->where('status', 1)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'task' => 'required'
        ]);

        try {
            Task::create($request->post());

            return response()->json([
                'message' => 'Task Saved Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while saving  a task!!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
        return response()->json([
            'task' => $task
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
        $request->validate([
            'task' => 'required'
        ]);

        try {

            $task->fill($request->post())->update();

            return response()->json([
                'message' => 'Task Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a task!!'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        //
        try {
            $task->fill(['status' => 0])->update();

            return response()->json([
                'message' => 'Task Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a task!!'
            ]);
        }
    }

    public function fetch(Request $request)
    {
        $key = ($request->has('key')) ? $request->key : "";
        return Task::select('id', 'task', 'status', 'created_at', 'updated_at')
            ->where('status', 1)
            ->when($key, function ($query, $key) {
                if ($key != '') {
                    return $query->where('task', 'like', '%' . $key . '%');
                }
            })
            ->get();
    }
}
