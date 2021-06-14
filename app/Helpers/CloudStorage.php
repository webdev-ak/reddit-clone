<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;

class CloudStorage extends ImageStorage {

    private static $rootDirectory = '/';

    public function uploadImageToStorage() {
        
        $imageName = $this->generateImageUniqueName();

        $imageCloudDirectory = $this->findImageCloudDirectory();
    
        Storage::cloud()->put($imageCloudDirectory['path'].'/'.$imageName,$this->image);

        return $imageName;
    }
    
    public function deleteImageFromStorage($imageName) {
        
        $imageCloudDirectory = $this->findImageCloudDirectory();

        $imageCloudDirectoryContent = $this->getCloudDirectoryContent($imageCloudDirectory['path'],false);

        $image = $imageCloudDirectoryContent
            ->where('type', '=', 'file')
            ->where('filename', '=', pathinfo($imageName, PATHINFO_FILENAME))
            ->where('extension', '=', pathinfo($imageName, PATHINFO_EXTENSION))
            ->first();
        
        Storage::cloud()->delete($image['path']);
    
        return response()->json('File was deleted from Google Drive');

    }
    
    private function getCloudDirectoryContent($directoryPath, $recursiveSearch) {

        return collect(Storage::cloud()->listContents($directoryPath, $recursiveSearch));
    }
    
    private function findImageCloudDirectory() {
    
        $rootDirectoryContent = $this->getCloudDirectoryContent(self::$rootDirectory,false);

        return $rootDirectoryContent
                ->where('type', '=', 'dir')
                ->where('filename', '=', $this->image_directory)
                ->first(); 

    }

    private function findImageInCloudDirectory($imageName) {
        
        $imageCloudDirectory = $this->findImageCloudDirectory();
    
        $imageCloudDirectoryContent = $this->getCloudDirectoryContent($imageCloudDirectory['path'],false);
    
        $image = $imageCloudDirectoryContent
            ->where('type', '=', 'file')
            ->where('filename', '=', pathinfo($imageName, PATHINFO_FILENAME))
            ->where('extension', '=', pathinfo($imageName, PATHINFO_EXTENSION))
            ->first();
        
        return $image;  
    }

    public function getImage($imageName) {
        
        $image = $this->findImageInCloudDirectory($imageName);

        $rawData = Storage::cloud()->get($image['path']);
        
        return response($rawData, 200)
            ->header('ContentType', $image['mimetype'])
            ->header('Content-Disposition', "attachment; filename='$imageName'");
    }

}