import React, { useEffect, useState } from 'react'
import './homeSearch.css'
import Loading from '../../Utils/Loading/Loading'
import FetchError from '../../Utils/FetchError/FetchError'
import Card from '../../Card/Card'
import { useNavigate, useParams } from 'react-router'
const HomeSearch = () => {
  const [searchInput,setSearchInput]=useState('')
  const [isButtonActive,setIsButtonActive]=useState(false)
  const navigate=useNavigate()
  const params=useParams()
  console.log(params)
  const onSearch=(e)=>{
    setSearchInput(e.target.value)
  }
  const[searchInputType,setSearchInputType]=useState('shows')
  const onRadioButtonChanged=(e)=>{
    setSearchInputType(e.target.value)
  }
 
 
  const initResponse={
    response:[],
    loading:false,
    error:''
  }
  const [fetchResult,setFetchResult]=useState(initResponse)
  const onSubmit=()=>{
    setIsButtonActive(true)
    navigate(`/search/${searchInputType}/${searchInput}`)
  }
  useEffect(()=>{
  console.log('updated data')
  const fetchData=async()=>{
    setFetchResult((p)=>{
      return{...p,loading:true,error:'',response:[]}
    })
    try{
    const apiResponse=await fetch(`https://api.tvmaze.com/search/${params.searchType}?q=${params.searchInput}`)
    const result=await apiResponse.json()
    setFetchResult((p)=>{
      return{...p,loading:false,error:'',response:result}
    })
    }
    catch(e){
      setFetchResult((p)=>{
        return{...p,error:'something went wrong',loading:false}
      })
      console.log(e)
    }
  }
  if(params.searchInput && params.searchType){
    fetchData()
  }
  
  },[params.searchType,params.searchInput])
   

  console.log(fetchResult)
  // console.log(searchInputType)
  // console.log(searchInput)
  
  return (
    <div  className='homeSearch-container'>
     <div>
     <input type='text' value={searchInput} className='input-box' placeholder='say something' onChange={(e)=>onSearch(e)}/>
     </div>
     <div className='radio-buttons'>
      <div >
        <input  checked={searchInputType==='shows'} id='shows' value='shows' type="radio" onChange={(e)=>onRadioButtonChanged(e)} />
        <label htmlFor='shows'>Shows</label>
      </div>
      <div>
      <input  checked={searchInputType==='people'} id='people' value='people' type="radio"  onChange={(e)=>onRadioButtonChanged(e)}/>
        <label htmlFor='people'>Actors</label>
      </div>

     </div>
     <div >
     <div className='search-button' activeButton={isButtonActive}  onClick={onSubmit}>Search</div>
     </div>
     <div className='search-result-container'>
      {
        fetchResult.error==='' && fetchResult.loading===false && fetchResult.response.length===0 && <h4 style={{color:'red'}}>Please Start Interaction </h4>
      }
      {
        fetchResult.loading && <Loading/>
      }
      {
        fetchResult.error && <FetchError error={fetchResult.error}/>
      }
      {
        fetchResult.response.length>0 && <>
        {
          fetchResult.response.map((card,cardId)=>{
            return <Card key={cardId} cardDetails={card} cardType={searchInputType}/>
          })
        }
        </>
      }

     </div>
    </div>
  )
}

export default HomeSearch