import {React, useEffect,useContext} from 'react'
import { InstaContext } from './context/Context'


const Notis = () => {
  // eslint-disable-next-line no-unused-vars
  const {setCanUseNotification}= useContext(InstaContext)
  

useEffect(() => {

  if('Notification' in window){

    Notification.requestPermission().then((result) => {
    
      if(result === 'granted'){

       setCanUseNotification(true)
               
      }else{
        window.alert('notification denied. Turn on notification!')
      }
    })
  }


},[setCanUseNotification])


  return (
    <div>
      
    </div>
  )
}

export default Notis





/* export default function notification(newPic){
  if('Notification' in window){

    Notification.requestPermission().then((result) => {
    
      if(result === 'granted'){

        // eslint-disable-next-line no-unused-vars
        const notification = new Notification('New Photo',{icon:newPic})
        
      }else{
        window.alert('notification denied. Turn on notification!')
      }
    })
  }

} */