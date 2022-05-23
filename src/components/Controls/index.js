import React from 'react';
import './Controls.css'

const Controls = (props) => {
    return (
        <>

            <div className="burger_controls" onClick={(e) => {
                props.onHandleIngredientQuantity(e)
            }}>
                {props.count.map((order) => (
                    <div key={order.ingredient} className='burger_control_item'>
                        <button data-ingre={order.ingredient} data-action='remove' className='rmv_ingr'>-</button>
                        <span>{order.quantity}</span>
                        <button data-ingre={order.ingredient} data-action='add' className='add_ingr'>+</button>
                        <img src={require(`../../images/${order.ingredient}.png`)} alt={order.ingredient} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Controls;