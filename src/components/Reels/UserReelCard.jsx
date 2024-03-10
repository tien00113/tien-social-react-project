import React from 'react'

const UserReelCard = () => {
  return (
    <div className='w-[15rem] px-2'>
        <video 
        controls
        className='w-full h-full' 
        src="https://player.vimeo.com/progressive_redirect/playback/727150722/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=561d913e6ed89cfaea768f672045cbe7288c64fd8dbeff1a06610b767ff35b59">

        </video>
    </div>
  )
}

export default UserReelCard