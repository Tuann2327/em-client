import React, { useEffect } from "react";
import Modal from 'react-modal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown,faHome,faPlus,faStore,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { generalimages } from "./images/images";
import axios from "axios";
import { server_url } from ".";
import { Link } from "react-router-dom";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      background: 'transparent'
    },
  };
  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');

const ItemEditCard = (props) =>{
    const [isLoading,setLoading] = useState(false)
    const [isErr,setErr] = useState('')
    const [link,setLink] = useState()
    const [name,setName] = useState()
    const [type,setType] = useState()
    const [price,setPrice] = useState()
    const [stock,setStock] = useState()

    const Submit = async (e)=>{
        e.preventDefault()
        setErr('')
        setLoading(true)
        if(!link||!name||!type||!price||!stock){
            setErr('Cannot let any input empty!')
            setLoading(false)
        }else{
            try{
                const data = {
                    shopid: props.shopId,
                    shopname: props.shopName,
                    img: link,
                    name: name,
                    type: type,
                    price: price,
                    stock: stock,
                }
                const newItem = await axios.post(`${server_url}/item`,data)
                props.OnNewItem()
            }catch(e){
                console.log(e)
                setLoading(false)
            }
        }
    }

    const options = [
        'Meat', 'Fruit', 'Vegetable', 'Bread'
      ];
    
    return(
        <div>
            <div className='create-item-card form-layout'>
                <div className='fl-img-holder'>
                    <img src={link?link:generalimages.image}></img>
                </div>
                <form onSubmit={Submit}>
                    <input value={link} onChange={(e)=>{setLink(e.target.value)}} placeholder="Image link" type='text'></input>
                    <div className='fl-group'>
                        <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Item's name" type='text'></input>
                        <Dropdown 
                                options={options}  
                                placeholder="Item type" 
                                className='item-price'
                                controlClassName='fl-dropdown'
                                menuClassName='fl-dropdown-menu'
                                value={type}
                                onChange={(e)=>{setType(e.value)}}
                            />
                    </div>

                    <div className='fl-group'>
                        <input value={price} onChange={(e)=>{setPrice(e.target.value)}} className='item-price' placeholder="Price" type='number'></input>
                        <input value={stock} onChange={(e)=>{setStock(e.target.value)}} className='item-price' placeholder="Stock" type='number'></input>
                    </div>
                    
                    <p className='fl-err'>{isErr?isErr:''}</p>
                    <button disabled={isLoading} className='fl-signin'>Submit</button>
                </form>
            </div>
        </div>
    )
}

const StoreItem = (props)=>{
    const item = props.itemdata
    const DeleteItem = async ()=>{

        try{
            const data = {
                itemid: item.itemid
            }
            console.log(data)
            const newItem = await axios.delete(`${server_url}/item`,{data})
            props.OnNewItem()
        }catch(e){
            console.log(e)
        }
        
    }
    return(
        <div className='store-item-card'>
            <p className='col-img'>
                <div className='si-imgholder'>
                    <img src={item.img}></img>
                </div>
            </p>
            <p className='col-name'>{item.name}</p>
            <p className='col-type'>{item.type}</p>
            <p className='col-price'>{`$${item.price}`}</p>
            <p className='col-stock'>{item.stock}</p>
            <p className='col-sales'>{`0 Sales`}</p>
            <button onClick={DeleteItem} className='si-delete'><FontAwesomeIcon icon={faTrashAlt}/></button>
        </div>
    )
}

const StorePage = (props)=>{
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [itemList,setItemList] = useState([])
    const [isNewItem,setIsNewItem] = useState(false)
    const [shopId,setShopId] = useState('none')
    useEffect(()=>{
        const getItem = async ()=>{
            const items = await axios.get(`${server_url}/item/search`,{params:{shopid: props.User.userid}})
            setItemList(items.data)
        }
        getItem()
    },[isNewItem])

    const switchModal = (open)=>{
        setIsOpen(open);
    }

    const OnNewItem = ()=>{
        switchModal(false)
        setIsNewItem(!isNewItem)
    }

    const renderedList = itemList.map(item=>{
        return(
            <StoreItem OnNewItem={OnNewItem} key={item.itemid} itemdata={item}/>
        )
    })
    return(
        <div className='StorePage'>
            <section className='section-layout'>
                <div className='store-dashboard'>
                    <p className='store-title'>Store Dashboard</p>
                    <p className='store-name'><FontAwesomeIcon icon={faStore}/>@{props.User.shopName}</p>
                </div>
            </section>
            <section className='store-list section-layout'>
                <div className='list-nav'>
                    <Link to='/'><FontAwesomeIcon icon={faHome}/> Home</Link>    
                    <button onClick={()=>{switchModal(true)}}><FontAwesomeIcon icon={faPlus}/> New  </button>    
                </div>
                <div className='list-head'>
                    <p className='col-img'>image</p>
                    <p className='col-name'>name <FontAwesomeIcon icon={faCaretDown}/></p>
                    <p className='col-type'>type <FontAwesomeIcon icon={faCaretDown}/></p>
                    <p className='col-price'>price <FontAwesomeIcon icon={faCaretDown}/></p>
                    <p className='col-stock'>stock <FontAwesomeIcon icon={faCaretDown}/></p>
                    <p className='col-sales'>sales <FontAwesomeIcon icon={faCaretDown}/></p>
                </div>
                <div className='list-main'>
                    {renderedList}
                </div>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>{switchModal(false)}}
                style={customStyles}
                contentLabel="Example Modal"
            >
                
                <ItemEditCard shopId={props.User.userid} shopName={props.User.shopName} OnNewItem={OnNewItem}/>
            </Modal>
        </div>
    )
}

export default StorePage