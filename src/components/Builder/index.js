import React from 'react';
import './Builder.css';

const Builder = (props) => (
    <>

        <div className="burger_builder">
            <h2>
                Burger price: {props.totalPrice.toFixed(2)} ₴
            </h2>
            <button className="btn_checkout" disabled={props.totalPrice.toFixed(2) <= 1 ? true : false} onClick={props.modalControl}>Checkout</button>
            <div className='burger_image'>
                <img src={require(`../../images/up-burger.png`)} alt='burger-up' width='400' height='165' />
                {props.totalPrice <= 1 && (<p>Start by adding ingredents to your burger</p>)}
                {props.inOrder.map((e, i) => (<p key={i} className={e}></p>))}
                <img src={require(`../../images/down-burger.png`)} alt='burger-down' width='400' height='50' />
            </div>
        </div>

    </>
)
export default Builder