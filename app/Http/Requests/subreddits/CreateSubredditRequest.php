<?php

namespace App\Http\Requests\subreddits;

use App\Subreddit;
use Illuminate\Foundation\Http\FormRequest;

class CreateSubredditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {

        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'title' => ['required','string','max:30','regex:/^([a-zA-Z. -]+)$/'],
            'name' => ['required','string','max:30','unique:subreddits','regex:/^([a-zA-Z. -]+)$/'],
            'description' => ['required','string'],
            'privacy' => [
                'required',
                'string',
                'in:'.Subreddit::PRIVATE_SUBREDDIT.','.Subreddit::PUBLIC_SUBREDDIT.','.Subreddit::RESTRICTED_SUBREDDIT
            ]
        ];
    }
}
