<?php

use App\Helpers\StorageHelper;

return [
    'storage_type' => env('APP_STORAGE_TYPE','local'),
    'email' => [
        'verification_message' => "Welcome To Reddit World, One more step before using your account...click the button below to verify your email address",
    ],
    'posts' => [
        'per_page_number' => 6
    ],
    'images' => [
        'profile_default_image_path' => 
        StorageHelper::getCurrentStorageType() === 'cloud' 
        ? "https://drive.google.com/uc?export=view&id=1bMbsPvodFcIVk4jhDs0ALUVRYVaKIIVo"
        : "/storage/img/profile-default-image.png",
        
        'subreddit_default_image_path' => 
        StorageHelper::getCurrentStorageType() === 'cloud'
        ? "https://drive.google.com/uc?export=view&id=17-Vex-aIoDMfSW8zIRhynwdFWnzINtVH"
        : "/storage/img/subreddit-default-image.png" 
    ],
    'validation_rules' => [
        'users_password_min_length' => 6
    ],
]    
?>
