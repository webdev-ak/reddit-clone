<?php

namespace App\Helpers;

class LocalStorage extends ImageStorage {

    public function uploadImageToStorage()
    {
        $imageName = $this->generateImageUniqueName();

        $imagePath = $this->image_directory.'/'.$imageName;

        $this->image->save(
            storage_path("app/public/images/".$imagePath)
        );

        return $imageName;
    }

    public function deleteImageFromStorage($imageName)
    {
        $imagePath = $this->image_directory.'/'.$imageName;
        
        unlink(storage_path("app/public/images/".$imagePath));
    }

}