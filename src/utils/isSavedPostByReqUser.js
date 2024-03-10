export const isSavedPostByReqUser = (postId, savedPost)=>{
    for(let post of savedPost){
        if(postId === post.id){
            return true;
        }
    }
    return false;
}