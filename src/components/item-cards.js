import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStore, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router"
const ItemCard = (props) =>{
    const navigate = useNavigate()

    const GoDetail = ()=>{
        navigate(`/item/${props.id}`)
    }

    return (
        <div className='item-card'>
            <div className='card-img-holder'>
                <img onClick={GoDetail} src={props.img} alt='item-img'></img>
                <div className='card-menu'>
                    <button className='card-addcart'>    
                        <FontAwesomeIcon icon={faShoppingCart} />
                        Add To Cart
                    </button>
                </div>
            </div>
            <div className='card-info-holder'>
                <p onClick={GoDetail} className='card-name'>
                    {props.name}
                </p>
                <p className='card-price'>
                    <span className='currency'>USD $</span>{props.price}
                </p>
                <p className='card-shop'>
                    <FontAwesomeIcon icon={faStore} />
                    {props.shop}
                </p>
            </div>
        </div>
    )
}

export default ItemCard