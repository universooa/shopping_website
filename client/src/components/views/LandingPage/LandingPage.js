import React,{useEffect} from 'react'
import axios from "axios";

function LandingPage() {

    useEffect(() => {
        
      axios.post('/api/product/products')
      .then(response=>{
          if(response.data.success){
            console.log(response.data)
          }else{
              alert("상품을 가져오는 데 실패 했습니다.")
          }
      })
 
    }, [])
    

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
