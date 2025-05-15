<?php

namespace Database\Factories;

use BcMath\Number;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Veiculos>
 */
class VeiculoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'marca' => fake()->company(),
            'ano' => fake()->year(),
            'estoque' => fake()->numberBetween(0,10),
            'image' => $this->generateImage(),
            'categoria_id' => \App\Models\Categoria::factory(),

        ];
    }
    public function generateImage(){
        $id = fake()->numberBetween(1,50);
        return "https://picsum.photos/id/{$id}/400/200";
    }
}
