<?php

namespace App\Http\Requests\profiles;

use App\Http\Requests\ImageManagerRequest;

class DeleteProfileImageRequest extends ImageManagerRequest
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
        return auth()->user() && auth()->user()->username === $this->user->username;
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

    public function deleteProfileImage($user) {
        
        $this->storage->setImageDirectory('profiles');
        $this->storage->deleteImageFromStorage($user->profileImage->url);

        $user->profileImage()->delete();
    }

}
