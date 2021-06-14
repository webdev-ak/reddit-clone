<?php

namespace App\Helpers;

class StorageHelper {

    public static function getCurrentStorageType() {
    
        return config()->get('constants.storage_type') ?: env('APP_STORAGE_TYPE','local');
    }

    public static function getImagePath($directory, $imageName) {
        
        return self::getCurrentStorageType() === 'cloud' 
            ? "/cloud/".$directory."/get/".$imageName 
            : asset("storage/images/".$directory."/".$imageName);
    }

}