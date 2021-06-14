<?php

namespace App\Http\Requests\profiles;

use App\Http\Requests\ImageManagerRequest;

class UpdateProfileImageRequest extends ImageManagerRequest
{

    public function __construct() {

        parent::__construct();
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {

        return auth()->user() && auth()->user()->username === $this->user->username;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {

        return [
            'image' => 'required|image'
        ];
    }
    
    public function updateProfileImage($user) {
        
        $image = $this->processImage();
        
        $uploadedImagePath = $this->uploadImage($image);
   
        if($user->profileImage) {
            
            $this->storage->deleteImageFromStorage($user->profileImage->url); 
            
            $user->profileImage()->update(['url' => $uploadedImagePath]);
            
            return;
            
        }
        
        $user->profileImage()->create(['url' => $uploadedImagePath]);
    }

    private function processImage() {

        return $this->imageProcessor
                ->prepareImage($this->file('image'))
                ->resizeImage(81,81)
                ->encodeImage($this->imageFormat);
    }

    private function uploadImage($image) {

        $this->storage->setImage($image);
        $this->storage->setImageFormat($this->imageFormat);
        $this->storage->setImageDirectory('profiles');
                
        return $this->storage->uploadImageToStorage();
    }
    
}