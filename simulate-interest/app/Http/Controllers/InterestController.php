<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\InterestCalculatorServices;

class InterestController extends Controller
{
    protected $interestCalculator;

    public function __construct(InterestCalculatorServices $interestCalculator)
    {
        $this->interestCalculator = $interestCalculator;
    }

    public function simulateInterest(Request $request)
    {
        $validated = $request->validate([
            'capital' => 'required|numeric|min:0',
            'rate' => 'required|numeric|min:0',
            'years' => 'required|numeric|min:0',
        ]);

        $result = $this->interestCalculator->calculateInterest(
            $validated['capital'],
            $validated['rate'],
            $validated['years']
        );

        return response()->json([
            'capital' => $validated['capital'],
            'rate' => $validated['rate'],
            'years' => $validated['years'],
            'result' => round($result, 2),
        ]);
    }

    public function calculateInvestment(Request $request)
    {
        $validated = $request->validate([
            'objectif' => 'required|numeric|min:0',
            'rate' => 'required|numeric|min:0',
            'years' => 'required|numeric|min:0',
        ]);
    
        $investmentRequired = $this->interestCalculator->calculateInvestment(
            $validated['objectif'],
            $validated['rate'],
            $validated['years']
        );
    
        return response()->json([
            'objectif' => $validated['objectif'],
            'rate' => $validated['rate'],
            'years' => $validated['years'],
            'result' => round($investmentRequired, 2),
        ]);
    }
    
}
