<?php

namespace App\Http\Controllers;

use App\Models\EquipmentType;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Equipment;

class EquipmentTypeController extends Controller
{
    public function index()
	{
        $equipmentTypes = EquipmentType::query()->get();

	    return response($equipmentTypes, 200);
	}
}
