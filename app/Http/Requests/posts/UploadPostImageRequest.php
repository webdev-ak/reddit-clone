<?php

namespace App\Http\Requests\posts;

use App\Http\Requests\ImageManagerRequest;

class UploadPostImageRequest extends ImageManagerRequest
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'image' => 'required|image',
        ];
    }

    public function uploadPostImage()
    {
        $image = $this->processImage();

        return $this->uploadImage($image);
    } 
    
    private function processImage() {
        
        $image = $this->imageProcessor->prepareImage($this->file('image'))->getImage();

        if($image->width() > 577) $this->imageProcessor->resizeImageWithAutoHeight(577);

        return $this->imageProcessor->encodeImage($this->imageFormat);
        
    }

    private function uploadImage($image) {

        $this->storage->setImage($image);
        $this->storage->setImageFormat($this->imageFormat);
        $this->storage->setImageDirectory('posts');
                
        return $this->storage->uploadImageToStorage();
    }

}
