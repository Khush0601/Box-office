import React from 'react'
import './card.css'
import { useNavigate } from 'react-router'
import imageNotFound from '../Image/imageNotFound.jpg'
const Card = ({cardDetails,cardType,isSaved,onRemove}) => {
 const navigate=useNavigate()
  const getSubString=(value)=>{
    if(!value){
      return 'No Description'
    }
    
  
  const leftSubString=value.replace( /(<([^>]+)>)/ig, '');
  let result=leftSubString.split(' ').splice(0,12)
  return `${result.join(' ')}...`
  }
  const uniqueEntry=(store,object)=>{
   let dataTostore=[...store]
   let idInObject=store?.findIndex((el,i)=>el?.show?.id===object?.show?.id)
   console.log(idInObject)
   if(idInObject<0){
    dataTostore=[...dataTostore,object]
   }
   else{
    alert(`give unique id becase given id is present in database`)
   }
   return[...dataTostore]
  }
  const addCardToMemory=(cardItem)=>{
    const showCard=JSON.parse(localStorage.getItem('shows'))??[];
    let newCardData=uniqueEntry(showCard,cardItem);
    localStorage.setItem('shows',JSON.stringify(newCardData))
  }
  const onNavigation=(cardItem)=>{
    let id=cardItem.show.id
    navigate(`/show/${id}`)

    console.log(cardItem)
  }
  
  console.log(cardDetails)
  return (
    <div className='card-container'>
      {isSaved && <span className='card-removal' onClick={()=>onRemove(cardDetails)}>X</span>}
      <div className="card-image">
        <img src={cardDetails[cardType==='shows'?'show':'person']?.image?.medium===undefined?imageNotFound:cardDetails[cardType==='shows'?'show':'person']?.image?.medium} alt='show-pic' width={'300px'} height={'300px'}/>
      </div>
      <div className='card-heading'>
           <div className='heading'>
            {cardDetails[cardType==='shows'?'show':'person']?.name}

           </div>
           {
            cardType==='shows' && getSubString(cardDetails?.show?.summary)
           }
           {
            cardType==='people' && ((!cardDetails?.person?.country?.name)?(cardDetails?.person?.country?.name): 'No Country known')
           }
          {
            cardType==='shows' && <div className='card-footer'>
              <span className='read-more'onClick={()=>onNavigation(cardDetails)} >Read More...</span>
              <button className='card-button' onClick={()=>addCardToMemory(cardDetails)}>❤</button>
            </div>
          }
          {
            cardType==='people' && <div>{cardDetails?.person?.gender}</div>
          }
      </div>
     
    </div>
  )
}

export default Card