<?php

namespace App\Http\Controllers;

use App\Models\Veiculo;
use App\Http\Requests\StoreVeiculoRequest;
use App\Http\Requests\UpdateVeiculoRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Storage;

use Throwable;

class VeiculoController extends Controller
{

    protected $veiculo;

    public function __construct(Veiculo $veiculo){
        $this->veiculo = $veiculo;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $veiculos = $this->veiculo->with('categoria')->get();

        return response()->json($veiculos, Response::HTTP_OK);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVeiculoRequest $request)
    {
        $data = $request->validated();

        if ($request->has('image')){
            $path = $request->file('image')->store('veiculos', 'public');
            $data['image'] = url('storage/'.$path);
        }

        $veiculo = $this->veiculo->create($data);
        $id = $veiculo->id;
        $veiculo_categoria=$this->veiculo->with('categoria')->findOrFail($id);

        return response()->json($veiculo_categoria, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $veiculo = $this->veiculo->with('categoria')->findOrFail($id);

        return response()->json($veiculo, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVeiculoRequest $request, $id): JsonResponse
    {
        $veiculo = $this->veiculo->with('categoria')->findOrFail($id);

        $data = $request->validated();

        if ($request->hasFile('image')){
            try{
                $image_name = explode('veiculos/', $veiculo['image']);
                Storage::disk('public')->delete('veiculos/'.$image_name[1]);
            }catch(Throwable){
            }finally{
                $path = $request->file('image')->store('veiculos', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $veiculo->update($data);

        return response()->json($veiculo, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $veiculo = $this->veiculo->findOrFail($id);
        $veiculo->delete();

        return response()->json(['message' => 'Veiculo deletado com sucesso !!']);
    }

    public function comprarVeiculo($id)
    {
        $veiculo = $this->veiculo->findOrFail($id);
        if($veiculo->estoque>0){
            $veiculo->estoque -= 1;
            $veiculo->save();
            return response()->json(['message' => 'Estoque atualizado com sucesso !!', 'estoque' =>$veiculo->estoque]);
        }

        return response()->json(['message' => 'Estoque indisponivel!']);
    }
}
