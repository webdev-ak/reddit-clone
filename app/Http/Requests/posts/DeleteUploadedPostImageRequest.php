<?php

namespace App\Http\Requests\posts;

use App\Http\Requests\ImageManagerRequest;

class DeleteUploadedPostImageRequest extends ImageManagerRequest
{
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
            'imageURL' => 'string|required'
        ];
    }

    public function deletePostUploadedImage() 
    {
        $this->storage->setImageDirectory('posts');

        $this->storage->deleteImageFromStorage($this->imageURL);
    }
}
