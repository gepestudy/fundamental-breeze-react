<?php

namespace App\Http\Controllers\S31;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function check()
    {
        $user = User::find(Auth::id());
        $role = $user->getRoleNames();
        return compact('role');
    }
    public function createRole()
    {
        try {
            $role = Role::create(['name' => 'user']);
            return compact('role');
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    public function createPermission()
    {
        try {
            $permissions = [
                ['name' => 'create post'],
                ['name' => 'read post'],
                ['name' => 'update post'],
                ['name' => 'delete post'],
            ];

            foreach ($permissions as $permissionData) {
                Permission::create($permissionData);
            }
            return Permission::all();
        } catch (\Throwable $th) {
            dd($th);
        }
    }

    public function givePermissionToRole()
    {
        $adminRole = Role::findByName('admin');
        $permissions = Permission::get();

        $adminRole->syncPermissions($permissions);

        return 'ok';
    }

    public function giveRoleToUser()
    {
        $adminRole = Role::findByName('admin');
        $user = User::find(3);
        $user->assignRole($adminRole);

        return 'ok';
    }
}
