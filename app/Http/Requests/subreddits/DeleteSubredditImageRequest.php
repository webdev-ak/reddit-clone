<?php

namespace App\Http\Requests\subreddits;

use App\Http\Requests\ImageManagerRequest;

class DeleteSubredditImageRequest extends ImageManagerRequest
{
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

        return [];
    }

    public function deleteSubredditImage($subreddit) {

        $this->storage->setImageDirectory('subreddits');
        $this->storage->deleteImageFromStorage($subreddit->image->url);

        $subreddit->image()->delete();

    }

}
