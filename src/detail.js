import NavBar from "./components/renav";
import { server_url } from ".";
import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import { useState } from "react/cjs/react.development";
import axios from "axios";
const Detail = (props)=>{
    let {id} = useParams()
    const [item,setItem] = useState({})
    useEffect(()=>{
        const GetItem = async()=>{
            const getitem = await axios.get(`${server_url}/item/search`,{params:{itemid: id}})
            setItem(getitem.data[0])
        }
        GetItem()
    },[item])
    return(
        <div className='DetailPage'>
            <section className="item-detail">
                <div className="de-imgholder">
                    <img src={item.img} alt="detail img"></img>
                </div>
                <div className="de-info">   
                    <h1 className="de-name">{item.name}</h1>
                    <p className="de-id">{id}</p>
                    <div className="de-detail"><p className="de-lable">Type: </p>{item.type}</div>
                    <div className="de-detail"><p className="de-lable">Vendor: </p>{item.shopname}</div>
                    <div className="de-detail">
                        <p className="de-lable">Price: </p>
                        <p><span className="currency">$</span>{item.price}</p>
                    </div>
                    <div className="de-detail">
                        <p className="de-lable">Quantity:</p>
                        <input className="de-qt" type='number'></input>
                    </div>
                    <button className="de-atc-btn">Add to Cart</button>
                    <button className="de-buy-btn">Buy Now</button>
                </div>      
            </section>
        </div>
    )
}

export default Detail
