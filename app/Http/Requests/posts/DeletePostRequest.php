<?php

namespace App\Http\Requests\posts;

use App\Http\Requests\ImageManagerRequest;

class DeletePostRequest extends ImageManagerRequest
{
    
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user() && auth()->id() === $this->post->user_id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [];
    }
    

    public function deletePostImage($post) {

        $this->storage->setImageDirectory('posts');
        $this->storage->deleteImageFromStorage($post->image->url);

        $post->image()->delete();
    }
}
