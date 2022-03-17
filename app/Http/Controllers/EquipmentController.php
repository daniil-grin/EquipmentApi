<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Equipment;

class EquipmentController extends Controller
{
    public function index()
	{
	    return Equipment::all();
	}

	public function show(Equipment $equipment): Equipment
    {
	    return $equipment;
	}

	public function store(Request $request): JsonResponse
    {
        $equipment = Equipment::create($request->all());

	    return response()->json($equipment, 201);
	}

	public function update(Request $request, Equipment $equipment): JsonResponse
    {
        $equipment->update($request->all());

	    return response()->json($equipment, 200);
	}

	public function delete(Equipment $equipment): JsonResponse
    {
        $equipment->delete();

	    return response()->json(null, 204);
	}

}
