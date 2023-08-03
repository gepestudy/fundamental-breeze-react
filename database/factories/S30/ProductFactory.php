<?php

namespace Database\Factories\S30;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->text(50),
            'image' => fake()->randomElement(['storage/images/productImages/1.png', 'storage/images/productImages/3.png', 'storage/images/productImages/2.png']),
            'description' => fake()->paragraphs(4, true),
            'price' => fake()->randomFloat(2, 100, 100000),
        ];
    }
}
