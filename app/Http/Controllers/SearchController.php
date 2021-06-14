<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subreddit;
use App\User;
use App\Post;

class SearchController extends Controller
{

    public function searchSubredditsAndUsers(Request $request, $per_page = 10) {
       
        $query = $request->input('query');
        
        $users = $this->searchUsers($query);

        $subreddits = $this->searchSubreddits($request,true);

        $subredditsAndUsers = $users->merge($subreddits);

        if($subredditsAndUsers->count() === 0) {
            return response()->json([
                "message" => "Sorry, there were no community or user results for “ $query ”"
            ],404);
        }

        return $subredditsAndUsers->paginateItems($per_page);
    }

    public function searchSubreddits(Request $request,$globalSearch = false) {
        
        $subredditQuery = Subreddit::query();

        $query = strtolower(trim($request->input('query')));

        if(!$query) return collect([]);

        if($globalSearch) {
            return $subredditQuery->where('name','LIKE',"%$query%")
               ->orWhere('title','LIKE',"%$query%")
               ->orWhere('description','LIKE',"%$query%")
               ->get()
               ->map(function ($subreddit)  {
                   $subreddit['type'] = 'subreddit';
                   
                   if($subreddit->isPrivate() && !$subreddit->isPrivateSubredditAccessibleForActiveUser()) {
                       $subreddit->__unset('subscriptions');
                   } 
    
                   return $subreddit;
               });
        }

        return $subredditQuery->where('name','LIKE',"$query%")->get();
    }

    public function searchUsers($query) {
        
        if(! trim(($query))) return collect([]);

        return User::where('username','LIKE',"%$query%")->with('subscriptions')
                ->get()
                ->map(function ($user)  {
                    $user['type'] = 'user';

                    return $user;
            });
    }

    public function searchPosts(Request $request) {

        $requestQuery = $request->input('query');

        if(!$requestQuery) return $this->emptyPostsJson($requestQuery);
        
        $query = $this->escape_regex_specialCharacters_in_string($requestQuery);

        $find_exact_word_pattern = "(?<![a-z])".$query."(?![a-z])";

        $strip_html_tags_pattern = "E'<[^>]+>'";

        $posts = Post::where('title','~*',$find_exact_word_pattern)
                ->orWhereRaw("regexp_replace(description,$strip_html_tags_pattern,'', 'gi') ~* ? ",[$find_exact_word_pattern])
                ->get()
                ->filterPrivatePosts()
                ->map(function($post) use($query){
                    
                    $queryOccurrencesInTitle = $this->find_word_occurrences_in_string($query,$post->title);

                    $post->queryOccurrencesCount = count($queryOccurrencesInTitle);
                    
                    $post->title = $this->highlight_occurrences_in_string($queryOccurrencesInTitle,$post->title);

                    return $post;
                });

        
        if($request->best) {
            $posts = $posts->sortByDesc(function($post) {
                return $post->queryOccurrencesCount;
            })->values();
        }

        if($posts->count() === 0) return $this->emptyPostsJson($query);
            
        return $posts->paginatePosts(10);
    }

    private function emptyPostsJson($query,$code = 404) {
        return response()->json([
            "message" => "Sorry, there were no posts results for “ ".$query." ” "
        ],$code);
    }
 
    private function highlight_occurrences_in_string($occurrences,$string) {
        
        foreach($occurrences as $key => $occurrence) {
            
            $pattern = $this->get_regexp_of_finding_exact_word_in_string($occurrence,true);

            $string = preg_replace($pattern,"<strong>$occurrence</strong>",$string);
        }

        return $string;
    }

    private function find_word_occurrences_in_string($word,$string) {

        $pattern = $this->get_regexp_of_finding_exact_word_in_string($word);

        preg_match_all($pattern,$string,$occurrences);

        return $occurrences[0];
    }

    private function get_regexp_of_finding_exact_word_in_string($word,$escapeSpecialCharacters = false) {

        $word = $escapeSpecialCharacters ? $this->escape_regex_specialCharacters_in_string($word) : $word;

        return "/(?<![a-z])".$word."(?![a-z])/i";
    }

    private function escape_regex_specialCharacters_in_string($string) {
        
        return $string ? preg_quote($string,"/") : "";
    }
}

