import { useForm } from "react-hook-form";

export default function Form(props) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });
    const onSubmit = (data) => {
        console.log(data);
        reset();
    }
    return (

        <div>

            <form className="modal__input" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name='name' placeholder="Your name" onChange={props.inputChange} {...register("name", {
                    required: true,
                    minLength: {
                        value: 4,
                        message: 'Your name too short'
                    },
                    maxLength: {
                        value: 15,
                        message: 'Your name too long'
                    }
                })} /><br />
                <p className="error">{errors?.name && <p>{errors?.name?.message || 'Enter your name!'}</p>}</p>
                <input type="number" name="number" placeholder="Your number" onChange={props.inputChange} {...register("number", {
                    required: true,
                    minLength: {
                        value: 5,
                        message: 'Your number too short'
                    },
                    maxLength: {
                        value: 15,
                        message: 'Your number too long'
                    }
                })} /><br />
                <p className="error">{errors?.number && <p>{errors?.number?.message || 'Enter your number!'}</p>}</p>
                <input type="text" name="address" placeholder="Your address" onChange={props.inputChange} {...register("address", {
                    required: true,
                    minLength: {
                        value: 4,
                        message: 'Your address too short'
                    },
                    maxLength: {
                        value: 15,
                        message: 'Your address too long'
                    }
                })} /><br />
                <p className="error">{errors?.address && <p>{errors?.address?.message || 'Enter your address!'}</p>}</p>
                <input type="checkbox" name='delivery' value="delivery" onChange={props.changeCheckbox} />
                <label htmlFor="delivery">Fast delivery</label><br />
                <input type="text" name="promo" placeholder="Promo-code" onChange={props.checkPromo} />
                <button className="button-order" type="submit" disabled={!isValid}>ORDER</button>
                <button className="button-close" onClick={props.onShowHideModal}>CLOSE</button>
            </form>

        </div>
    )

}