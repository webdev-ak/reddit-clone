<?php

namespace App\Http\Controllers;

use App\Helpers\CloudStorage;

class CloudStorageController extends Controller
{

    public function getImage($directoryName, $imageName) {
        
       $cloudStorage = new CloudStorage;

       $cloudStorage->setImageDirectory($directoryName);

       return $cloudStorage->getImage($imageName);
    }
}
