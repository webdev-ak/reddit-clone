<?php

namespace App\Helpers;

use Intervention\Image\Facades\Image;

class ImageProcessor {
   
    public $image;

    public function prepareImage($image) {
        
        $this->image = Image::make($image);
        
        return $this;
    }

    public function getImage() {
        return $this->image;
    }

    public function resizeImage($width,$height) {
        
        $this->image->resize($width,$height);

        return $this;
    }
    
    public function resizeImageWithAutoHeight($width) {
        
        $this->image->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        return $this;
    }

    public function resizeImageWithAutoWidth($height) {
        
        $this->image->resize($height, null, function ($constraint) {
            $constraint->aspectRatio();
        });

        return $this;
    }

    public function encodeImage($format) {
        return $this->image->encode($format);
    }
}