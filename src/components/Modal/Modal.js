import React from "react";
import Modal from "react-modal";
import "./Modal.css";
import axios from "axios";
import Form from "../Form/Form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      address: "",
      checked: true,
      promo: "Hello",
      finalPrice: this.props.totalPrice,
    };
  }
  componentDidMount = () => {
    axios
      .get("https://beetroot-burger-app.herokuapp.com/orders")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  checkPromo = (event) => {
    event.preventDefault();

    if (this.state.promo === event.target.value) {
      console.log("hello");
      this.setState({ finalPrice: this.state.finalPrice - 5 });
    } else {
      this.setState({ finalPrice: this.props.totalPrice });
    }
  };
  inputChange = (event) => {
    console.log(event.target.value);
    this.setState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  changeCheckbox = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        [this.state.checked]: !prevState.checked,
      };
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.totalPrice !== this.props.totalPrice) {
      this.setState({ finalPrice: this.props.totalPrice });
    }
  };

  postOrder = (data) => {
    const body = JSON.stringify({
      orderPhone: data.number,
      orderAddress: data.address,
      orderName: data.name,
      orderFast: this.state.checked,
      orderProducts: this.props.orderQuantity,
      orderPrice: this.state.finalPrice,
    });

    console.log("data", body);

    const URLPOST = {
      method: "POST",
      url: "https://beetroot-burger-app.herokuapp.com/orders",
      headers: {
        Authorization: "Bearer fbab44e0-5e31-4a93-bc8f-55fe77a066b0",
        "Content-Type": "application/json",
      },
      data: body,
    };

    axios(URLPOST)
      .then((res) => {
        this.props.setMessage(false);
      })
      .catch((error) => {
        this.props.setMessage(true);
      });

    this.props.cleanState();
    this.setState({
      name: "",
      number: "",
      address: "",
      checked: true,
      promo: "Hello",
      finalPrice: 1,
    });
    this.props.onShowHideModal();
  };

  render() {
    console.log(this.state.finalPrice);
    return (
      <Modal
        style={customStyles}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onShowHideModal}
        orderQuantity={this.props.orderQuantity}
        ariaHideApp={false}
      >
        <div className="modal">
          <h2 className="modal-title">Your order</h2>
          <div>
            {this.props.orderQuantity.map((e, i) =>
              e.quantity > 0 ? (
                <p className="order" key={i}>
                  {e.ingredient} x {e.quantity}
                </p>
              ) : (
                ""
              )
            )}
          </div>
          <h3 className="modal-price">
            Burger price: {this.state.finalPrice.toFixed(2)} ₴
          </h3>
          <Form
            inputChange={this.inputChange}
            changeCheckbox={this.changeCheckbox}
            checkPromo={this.checkPromo}
            postOrder={this.postOrder}
            onShowHideModal={this.props.onShowHideModal}
          />

          {/* <>
                            <form className="modal__input" onSubmit={this.handleSubmit}>
                                <input type="text" name="name" placeholder="Your name" onChange={this.inputChange} /><br />
                                <input type="tel" name="tel" placeholder="Your number" onChange={this.inputChange} /><br />
                                <input type="text" name="address" placeholder="Your address" onChange={this.inputChange} /><br />
                                <input type="checkbox" name='delivery' value="delivery" onChange={this.changeCheckbox} />
                                <label htmlFor="delivery">Fast delivery</label><br />
                                <label htmlFor="promo">You have PROMO-CODE?</label><br />
                                <input type="text" name="promo" placeholder="Promo-code" onChange={this.checkPromo} />
                                <button type="submit" className="apply-button" onClick={this.checkPromo} >Apply</button>
                            </form>
                            <button className="button-order" onClick={this.postOrder}>ORDER</button>
                            <button className="button-close" onClick={this.props.onShowHideModal}>CLOSE</button>
                        </> */}
        </div>
      </Modal>
    );
  }
}

export default CustomModal;
