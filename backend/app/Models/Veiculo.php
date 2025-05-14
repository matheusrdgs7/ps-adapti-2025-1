<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Veiculo extends Model
{
    /** @use HasFactory<\Database\Factories\VeiculosFactory> */
    use HasFactory, HasUuids;

    protected $fillable =[
        'name',
        'marca',
        'ano',
        'image',
        'categoria_id',
        'estoque'
    ];

    public function  categoria(){
        return $this->belongsTo(Categoria::class, 'categoria_id', 'id');
    }

    protected static function booted(){
        self::deleted(function(Veiculo $veiculo){
            try{
                $image_name = explode('image/', $veiculo['image']);
                Storage::disk('public')->delete('image/'.$image_name[1]);
            }catch(Throwable){
            }
        });
    }
}
