import React from 'react'
import { useNavigate, useParams } from 'react-router'
import './ShowDetails.css'
import { useFetchHooks } from '../Components/Hooks/useFetchHooks'
import Loading from '../Utils/Loading/Loading'
import FetchError from '../Utils/FetchError/FetchError'
const ShowDetails = () => {
  const params=useParams()
  console.log(params)
  let fetchResult=useFetchHooks(`https://api.tvmaze.com/shows/${params.id}?embed[]=seasons&embed[]=cast`)
  console.log(fetchResult.response)
  const removeHtml=(string)=>{
   if(!string){
    return ''
   }
   const leftSubString=string.replace(/<[^>]*>/g,'');
   return leftSubString
  }
  const navigate=useNavigate()
  if(fetchResult.loading){
    return <div className='loading-cont'><Loading/></div>
  }
  if(fetchResult.error){
    return <div className='error'><FetchError error={fetchResult.error}/></div>
  }
  if(fetchResult?.response!==''){
    return (
      <div className='showDetails-container'>
        <button className='card-button2'onClick={()=>navigate(-1)}>Back</button>
        <div className='show-details-top'>
          <div className='show-details-image'>
            <img src={fetchResult?.response?.image?.medium} width={'300px'} height={'470px'} alt='show deatails' />
          </div>
          <div className='show-details-descr'>
           <div className='show-details-desc-title'>
            <h2>{fetchResult?.response?.name}</h2>
            <span>|</span>
            <p>❤ {!fetchResult?.response?.rating?.average?'N/A':fetchResult?.response?.rating?.average}</p>
           </div>
           <div className='show-details-desc-summary'>
            {removeHtml(fetchResult?.response?.summary)}
           </div>
           <div className='tag-container'>
             <b>Tags:</b>
             {
              fetchResult?.response?.genres?.map((tagName,tagIndex)=>{
                return <div key={`${tagName}-${tagIndex}`}><span>{tagName}</span></div>
              })
             }
           </div>
          
           
          </div>
        </div>

        <div className='show-details-middle-first'> 
         <h3>Details</h3>
         <div className='details-desc'>
           <div>
            <span>Status:</span>
            <span><b>{fetchResult?.response?.status}</b></span>
           </div>
           <div>
            <span>Premiered:</span>
            <span>{fetchResult?.response?.premiered}</span>
           </div>
         </div>

        </div>
        <div className='show-details-middle-second'>
          <h3>Seasons</h3>
          <div className='seasons-desc'>
            <div>
              <span>Seasons in total:</span>
              <span><b>{fetchResult?.response?._embedded?.seasons?.length}</b></span>

            </div>
            <div>
              <span>Episodes in total:</span>
              <span>
                <b>{!fetchResult?.response?.episodes?'N/A':fetchResult?.response?.episodes}</b>
                </span>
            </div>

          </div>
        </div>
        <div className='show-details-footer'>
          <h3>Cast:</h3>
          <div className='cast-desc'>
               {
                fetchResult?.response?._embedded?.cast?.map((el,i)=>{
                  return <div key={`cast-${i}`}>
                    <div>
                      <img className='cast-image' src={el.person?.image?.medium} alt='cast' width={'50'} height={'50'}/>
                      <h6>{el.person?.name}</h6>
                      <p>{!el.person?.gender?'--':el.person?.gender}</p>
                    </div>
                   

                  </div>
                })

               }

          </div>
        </div>
          
       
      </div>
    )
  }
}

export default ShowDetails