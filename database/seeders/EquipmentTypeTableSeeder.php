<?php

namespace Database\Seeders;

use App\Models\EquipmentType;
use Illuminate\Database\Seeder;

class EquipmentTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EquipmentType::create([
            'title' => 'TP-Link TL-WR74',
            'mask' => 'XXAAAAAXAA'
        ]);
        EquipmentType::create([
            'title' => 'D-Link DIR-300',
            'mask' => 'NXXAAXZXaa'
        ]);
        EquipmentType::create([
            'title' => 'D-Link DIR-300 S',
            'mask' => 'NXXAAXZXXX'
        ]);
    }
}
