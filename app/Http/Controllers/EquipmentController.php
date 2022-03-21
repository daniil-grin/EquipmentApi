<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Equipment;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceResponse;

class EquipmentController extends Controller
{
    public function index()
	{
        $equipments = Equipment::query()
            ->leftjoin('equipment_types', 'equipment.equipment_type_id', '=', 'equipment_types.id')
            ->select('equipment.*', 'equipment_types.title')
            ->getQuery()
            ->paginate()
            ->items();

	    return response($equipments, 200);
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

	public function delete(Request $request): JsonResponse
    {
        /** @var Equipment $equipment */
        $equipment = Equipment::find($request->id);
        $equipment->delete();
	    return response()->json($equipment, 200);
	}

}
