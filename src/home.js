
import Modal from 'react-modal';
import NavBar from "./components/renav";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import {slideimages, productsimages} from "./images/images";
import { React, useEffect, useState } from "react";
import ItemCard from "./components/item-cards";
import axios from "axios";
import { server_url } from ".";
import { useNavigate, useParams } from "react-router";
import Detail from './detail';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    background: 'transparent'
  },
};

Modal.setAppElement('#root');

const Home = (props)=>{
  const navigate = useNavigate()
  let{id} = useParams()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [opSection,setOpSection] =useState(0)
  const [meats,setMeats] = useState([])
  const [fruits,setFruits] = useState([])
  const [vets,setVets] = useState([])
  const [breads,setBreads] = useState([])


  const switchModal = (open)=>{
    setIsOpen(open);
    if(!open) navigate('/')
  }
  useEffect(()=>{
    if(id) switchModal(true)
  },[id])
  useEffect(()=>{
    const GetAPI = async ()=>{
      const fkmeat = await axios.get(`${server_url}/item/search`,{params:{type: 'Meat'}})
      setMeats(fkmeat.data)
      const fkbread = await axios.get(`${server_url}/item/search`,{params:{type: 'Vegetable'}})
      setBreads(fkbread.data)
      const fkvet = await axios.get(`${server_url}/item/search`,{params:{type: 'Bread'}})
      setVets(fkvet.data)
      const fkfruit = await axios.get(`${server_url}/item/search`,{params:{type: 'Fruit'}})
      setFruits(fkfruit.data)  
    }
    GetAPI()
  },[])

  const ReturnSection = (id)=>{
    let data = [];
    switch(id){
      case 0:
         data = [...meats];
      break;
      case 1:
         data = [...fruits];
      break;
      case 2:
         data = [...breads];
      break;
      case 3:
         data = [...vets];
      break;
    }

    return data.map((item,id)=>{
      return(
        <SplideSlide id={id}>
          <ItemCard
            id={item.itemid}
            img={item.img}
            name={item.name}
            shop={item.shopname}
            price={item.price}
          />
        </SplideSlide>
      )
    })
  }

  return (
    <div className="Home">
      <NavBar User={props.User} SetUser={props.SetUser}></NavBar>
      <section className='intro-carousel section-layout'>
        <Splide options={
          {
            type: 'loop',
            heightRatio: 0.28,
            width:'100%',
            breakpoints:{
              1400:{
                height: '400px',
              },
              900:{
                height: '300px',
              }
            }
          }
        }>
          <SplideSlide>
            <div className='slide-page'>
              <img className='background-img' src={slideimages.slide3} alt="Image 1"/>
                <div className='slide-html pos1'>
                  <p className='slide-title'>Organic Vegetable</p>
                  <p className='slide-des'>Small Changes Big Difference</p>
                  <button>
                    Shop Now
                  </button>
                </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className='slide-page'>
              <img className='background-img' src={slideimages.slide1} alt="Image 2"/>
                <div className='slide-html pos1'>
                  <p className='slide-title'>Organic Vegetable</p>
                  <p className='slide-des'>Small Changes Big Difference</p>
                  <button>
                    Shop Now
                  </button>
                </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className='slide-page'>
              <img className='background-img' src={slideimages.slide2} alt="Image 3"/>
                <div className='slide-html pos2'>
                  <p className='slide-title'>Organic Vegetable</p>
                  <p className='slide-des'>Small Changes Big Difference</p>
                  <button>
                    Shop Now
                  </button>
                </div>
            </div>
          </SplideSlide>
        </Splide>
      </section>
      <section className='our-products section-layout'>
        <div className='op-menu-head'>
          <h1 className='op-title'>Our Products</h1>
          <p className='op-des'>We bring to you the best ingredients</p>
          <div className='op-section-wrapper'>
            <div style={{paddingLeft:'46px'}} 
              onClick = {()=>{setOpSection(0)}}
              className={`op-section-item${opSection===0?'-active':''}`}
            >
              <p className='op-section-name'>Meats</p> 
              <img style={{width:'60px'}} className='op-section-img' src={productsimages.meats} alt='menuicon'></img> 
            </div>
            <div 
              onClick = {()=>{setOpSection(1)}}
              className={`op-section-item${opSection===1?'-active':''}`}
            >
              <p className='op-section-name'>Fruits</p> 
              <img className='op-section-img' src={productsimages.fruits} alt='menuicon'></img> 
            </div>
            <div 
              onClick = {()=>{setOpSection(2)}}
              className={`op-section-item${opSection===2?'-active':''}`}
            >
              <p className='op-section-name'>Vegetables</p> 
              <img className='op-section-img' src={productsimages.vegetables} alt='menuicon'></img> 
            </div>
            <div 
              onClick = {()=>{setOpSection(3)}}
              className={`op-section-item${opSection===3?'-active':''}`}
            >
              <p className='op-section-name'>Breads</p> 
              <img style={{height:'55px'}} className='op-section-img' src={productsimages.breads} alt='menuicon'></img> 
            </div>
          </div>
        </div>
        <div className='op-menu-grid'>
          <Splide options={
            {
              type: 'loop',
              width:'100%',
              perPage: 6,
              padding: '40px',
              gap: '20px',
              breakpoints:{
                1400:{
                  perPage: 5,
                },
                1200:{
                  perPage: 4,
                },
                900:{
                  perPage: 3,
                },
                600:{
                  perPage: 2,
                }
              },
            }
          }>
            {ReturnSection(opSection)}
          </Splide>
        </div>
      </section>
      <p>{id}</p>

      <Modal
          isOpen={modalIsOpen}
          onRequestClose={()=>{switchModal(false)}}
          style={customStyles}
          contentLabel="Example Modal"
      >
        <Detail></Detail>
      </Modal>
    </div>
  );
}

export default Home;
