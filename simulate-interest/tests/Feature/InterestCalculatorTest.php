<?php

namespace Tests\Feature;

use Tests\TestCase;

class InterestCalculatorTest extends TestCase
{
    /** @test */
    public function it_calculates_compound_interest()
    {
        $response = $this->postJson('/api/simulate-interest', [
            'capital' => 1000,
            'rate' => 5,
            'years' => 10
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                     'capital' => 1000,
                     'rate' => 5,
                     'years' => 10,
                     'result' => 1628.89
                 ]);
    }
}
