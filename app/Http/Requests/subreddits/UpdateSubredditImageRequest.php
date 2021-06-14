<?php

namespace App\Http\Requests\subreddits;

use App\Http\Requests\ImageManagerRequest;

class UpdateSubredditImageRequest extends ImageManagerRequest
{

    public function __construct(){

        parent::__construct();
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {

        return $this->user()->can('updateImage',$this->subreddit);
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

    public function updateSubredditImage($subreddit) {
        
        $image = $this->processImage();

        $uploadedImagePath = $this->uploadImage($image);

        if($subreddit->image) {
            
            $this->storage->deleteImageFromStorage($subreddit->image->url); 
            
            $subreddit->image()->update(['url' => $uploadedImagePath]);
            
            return;
            
        }

        $subreddit->image()->create(['url' => $uploadedImagePath]);
        
    } 
    
    private function processImage() {

        return $this->imageProcessor
                ->prepareImage($this->file('image'))
                ->resizeImage(80,80)
                ->encodeImage($this->imageFormat);
    }

    private function uploadImage($image) {

        $this->storage->setImage($image);
        $this->storage->setImageFormat($this->imageFormat);
        $this->storage->setImageDirectory('subreddits');
                
        return $this->storage->uploadImageToStorage();
    }
}
