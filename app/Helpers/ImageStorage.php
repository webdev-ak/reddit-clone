<?php

namespace App\Helpers;

abstract class ImageStorage {

    public $image;
    public $image_format;
    public $image_directory;

    public function setImage($image) {
        $this->image = $image;    
    }
    
    public function setImageFormat($image_format) {
        $this->image_format = $image_format;
    }
    
    public function setImageDirectory($image_directory) {
        $this->image_directory = $image_directory;
    }

    public abstract function uploadImageToStorage();
    
    public abstract function deleteImageFromStorage($imageName);

    public function generateImageUniqueName() {
        
        $imageHash = md5($this->image->__toString());

        $imageName = $imageHash.".".$this->image_format;      
        
        return $imageName;       
    }

}