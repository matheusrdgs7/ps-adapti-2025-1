<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVeiculoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'min:3', 'max:80'],
            'marca' => ['sometimes', 'min:3', 'max:80'],
            'ano' => ['sometimes', 'integer'],
            'image' => ['file'],
            'categoria_id' => ['sometimes'],
            'estoque' => ['sometimes', 'integer'],
        ];
    }
}
