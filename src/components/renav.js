
import Modal from 'react-modal';
import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faBars, faCheckSquare, faSignOutAlt ,faUser} from '@fortawesome/free-solid-svg-icons'
import { faSquare as farSquare } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import { generalimages } from '../images/images';
import { server_url } from '..';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router"

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

const LoginForm = (props)=>{
    const [isLoading,setLoading] = useState(false)
    const [isErr,setErr] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const SignIn = async (e)=>{
        e.preventDefault()
        const data={
            email,
            password
        }
        setLoading(true)
        if(email===''||password===''){
            setLoading(false)
            setErr('Email or password cannot be empty!')
        }else{
            try{
                const account = await axios.post(`${server_url}/account/check`,data)
                if(account.data ==='err'){
                    setLoading(false)
                    setErr('Email or password is not correct!')
                }
                else props.Login(account.data)
            }catch(e){
                console.log(e)
                setLoading(false)
                setErr('Server not responding!')
            }
        }
    }

    return(
        <>
            <div className='login form-layout'>
                <h2 className='fl-title'>Welcome</h2>
                <p>Don't have an account? <span className='fl-link' onClick={props.SwitchForm}>Register</span></p>
                <form onSubmit={SignIn}>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email:' className='fl-email' type='text'></input>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password:' className='fl-password' type='password'></input>
                    <p className='fl-err'>{isErr?isErr:''}</p>
                    <button disabled={isLoading} className='fl-signin'>Sign In</button>
                </form>
            </div>
        </>
    )
}


const SignUpForm = (props) =>{
    const [isLoading,setLoading] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [shopName,setShopName] = useState('')
    const [isSeller,setSeller] = useState(false)
    const SellerClick = (e) => {
        e.preventDefault();
        setSeller(!isSeller)
    }

    const SignUp = async(e)=>{
        e.preventDefault()
        const data = {
            email,
            password,
            isSeller,
            shopName
        }
        setLoading(true)
        try{
            const account= await axios.post(`${server_url}/account`,data)
            props.Login(account.data)
        }catch(e){
            console.log(e)
            setLoading(false)
        }
        
    }

    return(
        <>
            <div className='login form-layout'>
                <h2 className='fl-title'>Sign Up</h2>
                <p>Already have an account? <span className='fl-link' onClick={props.SwitchForm}>Login</span></p>
                <form onSubmit={SignUp} >
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email*:' className='fl-email' type='text'></input>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password*:' className='fl-password' type='password'></input>
                    <button onClick={SellerClick} className={`fl-seller${isSeller?'-active':''}`}>
                        {isSeller?<FontAwesomeIcon icon={faCheckSquare} />:<FontAwesomeIcon icon={farSquare} />} 
                        Become a seller 
                    </button>

                    {isSeller?<input value={shopName} onChange={(e)=>{setShopName(e.target.value)}}  placeholder="Enter your store's name*" className='fl-shop' type='text'></input>:''}
                    <button disabled={isLoading} className='fl-signin'>{!isLoading?'Sign Up':'...'}</button>
                </form>
            </div>
        </>
    )
}

const UserProfile = (props) =>{
    const navigate = useNavigate()
    return(
        <div className='profile-card form-layout'>
            <div className='pf-avt'>
                <img src={generalimages.avt} alt='user avt'></img>
            </div>
            <p className='pf-username'>{props.User.email}</p>
            <div className='pf-stats'>

            </div>
            <div className='pf-btns'>
                <button onClick={()=>{navigate('/shop')}} disabled={!props.User.isSeller} className={`pf-btn-shop${props.User.isSeller?'-active':''}`}>
                    <FontAwesomeIcon icon={faStore} />
                    Shop Manager
                </button>
                <button className='pf-btn-logout'>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
            </div>
        </div>
    )
}
const NavBar = (props)=>{
    const [isOpen,setOpen] = useState(false)
    const [isLogin,setLogin] = useState(true)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const switchModal = (open)=>{
        setIsOpen(open);
    }
    const openMenu = () =>{
        setOpen(!isOpen)
    }
    const SwitchForm = () =>{
        setLogin(!isLogin)
    }
    const BeginLogin = (data)=>{
        props.SetUser(data)
        switchModal(false)
    }

    return(
        <section className='NavBar'>
        <nav className="nav-holder section-layout">
            <div className="nav-icon">
                <Link to="/">Green Mart</Link>
            </div>
            <div className=  {`navlist nav-items-list-style02 nav-hide ${isOpen?'nav-show':''}`}>
                <div className="nav-items-main">
                    <div className="nav-item">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/">Shop</Link>
                    </div>
                    <div className="nav-item">
                        <Link to="/">Contact Us</Link>
                    </div>
                </div>
            </div>
            <div className='nav-side right'>
                <div className="nav-burger">
                    <button onClick={openMenu} className="nav-open">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                <div className='nav-items-right'>
                    <p className="nav-item" onClick={()=>{switchModal(true)}}>
                        {props.User?<FontAwesomeIcon icon={faUser}/>:'Sign In'}
                    </p>
                </div>
            </div>
            
            <div 
                style={{
                    height: document.documentElement.clientHeight,
                    display: !isOpen?'none':'',
                }} 
                onClick = {openMenu}
                className='nav-overlay'
            >
                
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=>{switchModal(false)}}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {(props.User!==null)
                    ?<UserProfile User={props.User}/>
                    :(isLogin?<LoginForm Login={BeginLogin} SwitchForm={SwitchForm}/>:<SignUpForm Login={BeginLogin} SwitchForm={SwitchForm}/>)}
                
                
            </Modal>
        </nav>
        </section>
    )
}

export default NavBar