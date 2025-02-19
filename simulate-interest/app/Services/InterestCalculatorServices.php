<?php

namespace App\Services;

class InterestCalculatorServices
{
    public function calculateInterest(float $capital, float $rate, int $years): float
    {
        return $capital * pow(1 + ($rate / 100), $years);
    }

    public function calculateInvestment(float $objectif, float $rate, int $years): float
    {
        return $objectif / pow(1 + ($rate / 100), $years);
    }
}
