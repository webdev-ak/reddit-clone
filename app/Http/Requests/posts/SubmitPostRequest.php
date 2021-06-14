<?php

namespace App\Http\Requests\posts;

use Illuminate\Foundation\Http\FormRequest;

class SubmitPostRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check() && $this->user()->can('submitPosts',$this->subreddit);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required','max:300'],
            'description' => 'string',
            'imageURL' => 'string',
        ];

    }

    
}
