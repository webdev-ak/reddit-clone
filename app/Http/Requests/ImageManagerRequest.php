<?php

namespace App\Http\Requests;

use App\Helpers\CloudStorage;
use App\Helpers\ImageProcessor;
use App\Helpers\LocalStorage;
use App\Helpers\StorageHelper;
use Illuminate\Foundation\Http\FormRequest;

class ImageManagerRequest extends FormRequest
{
    public $imageProcessor;
    public $imageFormat = 'jpg';
    public $storage;
    
    public function __construct() {
        
        $this->imageProcessor = new ImageProcessor;
        $this->storage = StorageHelper::getCurrentStorageType() === 'cloud' ? new CloudStorage : new LocalStorage;
    }
}
