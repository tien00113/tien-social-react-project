export const FollowUser= (reqUser, userres) =>{
    for(let user of reqUser.followings){
        if (userres.id===user) {
            return true;
        }
    }
    return false;
}
