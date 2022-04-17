import React,{useEffect, useState} from 'react'
import axios from "axios";
import {Icon, Col,Card,Row} from 'antd';
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {
        
      axios.post('/api/product/products')
      .then(response=>{
          if(response.data.success){
            console.log(response.data)
            console.log("상품가져오기 성공")
            console.log(response.data.productInfo)

            setProducts(response.data.productInfo)
          }
          else
          {
              alert("상품을 가져오는 데 실패 했습니다.")
          }
      })
 
    }, [])
    
    const renderCards=Products.map((product,index)=>{

        console.log('product',product)
        return <Col lg={6} md={8} xs={24} key={index}>
         <Card
            
            cover={<ImageSlider images={product.images}/>

            }
        >
            <Meta
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })

    return (
        <div style={{ width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
            <h2> Let's Travel Anywhere <Icon type="rocket"/> </h2>
            </div>

            <Row gutter={[16,16]}>
            {renderCards}
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center'}} >
                <button> 더보기 </button>

            </div>
        </div>
    )
}

export default LandingPage
