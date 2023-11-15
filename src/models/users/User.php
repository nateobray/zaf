<?php
namespace models\users;

use obray\data\types\Boolean;
use obray\data\types\Varchar12Nullable;
use obray\users\User as UsersUser;

class User extends UsersUser
{
    public Varchar12Nullable $col_user_phone;
    public Boolean $col_user_is_demo;
}