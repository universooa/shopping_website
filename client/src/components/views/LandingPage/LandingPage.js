    import React,{useEffect, useState} from 'react'
    import axios from "axios";
    import {Icon, Col,Card,Row} from 'antd';
    import Meta from 'antd/lib/card/Meta'
    import ImageSlider from '../../utils/ImageSlider';
    import CheckBox from './Sections/CheckBox'
    import {continents} from './Sections/Datas'

    function LandingPage() {

        const [Products, setProducts] = useState([])
        const [Skip, setSkip] = useState(0)
        const [Limit, setLimit] = useState(6)
        const [PostSize, setPostSize] = useState(0)
        const [Filters, setFilters] = useState({
            continents:[],
            price:[]
        })
    
        
    

        useEffect(() => {

            let body={
                skip: Skip,
                limit: Limit

            }
            
            getProducts(body)
    
        }, [])

        const getProducts=(body)=>{
            axios.post('/api/product/products',body).then(response=>{
            if(response.data.success){
                    if (body.loadMore){
                        setProducts([...Products,...response.data.productInfo])
                        //원래 있던거 + 새로운 것
                    }else{
                        
                        console.log(response.data)
                        console.log("상품가져오기 성공")
                        console.log(response.data.productInfo)
            
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.PostSize)
                }
                else
                {
                    alert("상품을 가져오는 데 실패 했습니다.")
                }
            })
        }

        const loadMoreHandler=()=>{

            let skip= Skip+Limit

            let body={
                skip: skip,
                limit: Limit,
                loadMore: true //더보기 눌렀을 때 가는 정보라는 것을 알려줌.

            }

            getProducts(body)
            setSkip(skip)

        }

        
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

        const showFilteredResults=(filters)=>{
            let body={
                skip: 0,
                limit:Limit,
                filters:filters
                
            }
            console.log("showFilteredResults")
            console.log(body)
            getProducts(body)
            setSkip(0)
        }

        const handleFilters =(filters, category)=>{
            const newFilters = {...Filters}
            console.log("handleFilters")
            console.log(category)
            newFilters[category]=filters

            showFilteredResults(newFilters)
        
        }

        return (
            <div style={{ width: '75%', margin: '3rem auto'}}>
                <div style={{ textAlign: 'center'}}>
                <h2> 캐릭터 쇼핑하기 <Icon type="rocket"/> </h2>
                </div>

                <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>


                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>

                <br/>
                    {PostSize>=Limit &&
                    // 더이상 로드할 데이터가 없으면 더보기 버튼 invisible 만듦
                    <div style={{ display: 'flex', justifyContent: 'center'}} >
                        <button onClick={loadMoreHandler}> 더보기 </button>

                    </div>
                    }
            </div>
        )
    }

    export default LandingPage
