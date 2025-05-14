<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Categoria extends Model
{
    /** @use HasFactory<\Database\Factories\CategoriaFactory> */
    use HasFactory, HasUuids;


    protected $fillable = [
        'name'
    ];

    public function veiculos(){
        return $this->hasMany(Veiculo::class, 'categoria_id', 'id');
    }

    protected static function booted(){
        self::deleting(function(Categoria $categoria){
                $categoria->veiculos()->each(function(Veiculo $veiculo){
                    $veiculo->delete;
                });
        });
    }
}
