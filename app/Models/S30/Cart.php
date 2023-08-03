<?php

namespace App\Models\S30;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Cart extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function Users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
