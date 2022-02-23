<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index()
    {
        $tasks = Task::query()->orderBy('id', 'desc')->get();
        return response()->json($tasks);
    }

    /**
     * @param StoreTaskRequest $request
     * @return JsonResponse
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::query()->create($request->validated());
        return response()->json($task);
    }

    /**
     * @param Task $task
     * @param UpdateTaskRequest $request
     * @return JsonResponse
     */
    public function update(Task $task, UpdateTaskRequest $request)
    {
        $task->update($request->validated());
        return response()->json($task);
    }

    /**
     * @param Task $task
     * @return JsonResponse
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json('ok');
    }
}
