<?php

namespace App\Providers;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     *
     * Bootstrap any application services.
     * @return void
     */
    public function boot()
    {
        $context = $this;

        Collection::macro('paginatePosts',function ($per_page = null) use($context) {

            $per_page = $per_page ? $per_page : Config::get('constants.posts.per_page_number');

            return $context->createPagination($this->items,$per_page);
        });

        
        Collection::macro('paginateItems',function ($per_page) use($context) {

            return $context->createPagination($this->items,$per_page);
        });
        
        Collection::macro('filterPrivatePosts', function()  {
 
            $posts = new Collection($this->items);

            return $posts->filter(function($post) {
            
                if($post->subreddit->isPrivate())  return $post->subreddit->isPrivateSubredditAccessibleForActiveUser();
    
                return true;
    
            });

        });

        Collection::macro('orderByMostRecent', function() {
            
            $collection = new Collection($this->items);

            return $collection->sortByDesc('created_at')->values();
        });

    }

    public function createPagination($items,$per_page) {
        
        $currentPage = LengthAwarePaginator::resolveCurrentPage();

        $collection = new Collection($items);

        $currentPageResults = $collection->slice(($currentPage-1) * $per_page, $per_page)->all();

        $results = new LengthAwarePaginator($currentPageResults, count($collection), $per_page);

        $results->setPath(request()->url());
        
        return $results;
    }
}
