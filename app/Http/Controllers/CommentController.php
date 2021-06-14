<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Post;
use Hashids\Hashids;

class CommentController extends Controller
{
    public function getPostComments(Post $post) {

        $comments = $post->comments()->orderBy('created_at', 'desc')->get();
         
        if($comments->count() === 0) {
            return response()->json([],404);
        }

        return $comments;
    }

    public function getComment($commentIdHashed) {

        $commentId = $this->decodeCommentId($commentIdHashed);
        
        if(!$commentId) return response([],404);
        
        $comment = Comment::find($commentId);

        if(!$comment) return response([],404);
        
        return response()->json($comment);
    }
    
    public function decodeCommentId($id) {
        
        $hashids = new Hashids();

        return $hashids->decode($id) ? $hashids->decode($id)[0] : null;
    }

    public function store(Request $request,Post $post)
    {

        $this->validate($request,[
            'body' => 'required',
        ]);

        return auth()->user()->comments()->create([
            'content' => $request->body,
            'comment_id' => $request->comment_id,
            'post_id' => $post->id
        ])->fresh();
    }

    public function destroy(Comment $comment) {

        $comment->delete();
        
        return response()->json([]);

    }

    public function update(Request $request,Comment $comment) {
        
        $this->validate($request,[
            'body' => 'required',
        ]);
        
        $comment->content = $request['body'];

        $comment->save();

        return $comment->fresh();
    }

}
