<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use phpDocumentor\Reflection\Types\Mixed_;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoriaController extends Controller
{
    protected  $categoria;

    public function __construct(Categoria $categoria){
        $this->categoria = $categoria;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $categoria = $this->categoria->all();

        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriaRequest $request): JsonResponse
    {
        $data = $request->validated();

        $categoria = $this->categoria->create($data);

        return response()->json($categoria, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $categoria = $this->categoria->findOrFail($id);

        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriaRequest $request, $id): JsonResponse
    {
        $categoria = $this->categoria->findOrFail($id);

        $data = $request->validated();

        $categoria->update($data);

        return response()->json($categoria, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $categoria = $this->categoria->findOrFail($id);

        $categoria->delete();

        return response()->json(['message' => 'Categoria deletado com sucesso !']);
    }
}
