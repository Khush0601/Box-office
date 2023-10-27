import React, { useState } from 'react'
import Card from '../Card/Card'
import './Starred.css'
const Starred = () => {
  const [savedCard,setsavedCard]=useState(JSON.parse(localStorage.getItem('shows'))??[])
 
  const handleRemove=(itemToRemove)=>{
   let restItems=savedCard.filter((el,i)=>el.show.id!==itemToRemove.show.id)
   localStorage.setItem('shows',JSON.stringify(restItems))
   setsavedCard(restItems)
  }

  return (
    <div className='starred-container'>
     {
      savedCard?.length !==0 ? <>
      {
      savedCard.map((card,cardId)=>{
        return <Card key={cardId} cardDetails={card}  cardType={'shows'} isSaved={true} onRemove={handleRemove} />
      })
      }
      </>:<>
      please add your favorite show</>
     }
    </div>
  )
}

export default Starred