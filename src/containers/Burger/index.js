import React from "react";
import { Prices, Controls, Builder } from "../../components";
import CustomModal from "../../components/Modal/Modal";
import "./Burger.css";
import axios from "axios";

class Burger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 1,
      isModalOpen: false,
      order: [],
      products: [],
      inOrder: [],
      message: "",
    };
  }

  cleanState = () => {
    this.setState({
      totalPrice: 1,
      isModalOpen: false,
      order: [],
      products: [],
      inOrder: [],
      message: this.state.message,
    });
  };
  setMessage = (err) => {
    this.setState({ message: err ? "Success!" : "Failed" });
  };

  componentDidMount = () => {
    axios
      .get("https://beetroot-burger-app.herokuapp.com/ingredients")
      .then((response) => response.data)
      .then((result) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            order: result[0].ingredients.map((ingredient) => {
              return { ingredient: ingredient.name, quantity: 0 };
            }),
            products: result[0].ingredients,
          };
        });
      })
      .catch((error) => console.log(error));
  };

  findIngredientPrice = (ingredient) =>
    this.state.products.find((element) => element.name === ingredient).price;

  findIngredientQuantity = (ingredient) =>
    this.state.order.find((element) => element.ingredient === ingredient)
      .quantity;

  onShowHideModal = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isModalOpen: !prevState.isModalOpen,
      };
    });
  };

  onHandleIngredientQuantity = (e) => {
    e.preventDefault();
    if (e.target.dataset.action === undefined) {
      return;
    }
    switch (e.target.dataset.action) {
      case "remove":
        this.removeIngredient(e.target.dataset.ingre);
        break;
      default:
        this.addIngredient(e.target.dataset.ingre);
        break;
    }
  };

  addIngredient = (ingredient) => {
    if (this.findIngredientQuantity(ingredient) < 5) {
      this.setState((prevState) => {
        const newOrder = prevState.order.map((e) => {
          if (e.ingredient === ingredient) {
            return {
              ...e,
              quantity: e.quantity + 1,
            };
          }
          return e;
        });
        return {
          ...prevState,
          order: newOrder,
          inOrder: [...prevState.inOrder, ingredient],
          totalPrice:
            prevState.totalPrice + this.findIngredientPrice(ingredient),
        };
      });
    }
  };

  removeIngredient = (ingredient) => {
    const lastIndex = this.state.inOrder.lastIndexOf(ingredient);
    if (this.findIngredientQuantity(ingredient) > 0) {
      this.setState((prevState) => {
        const newOrder = prevState.order.map((e) => {
          if (e.ingredient === ingredient) {
            return {
              ...e,
              quantity: e.quantity - 1,
            };
          }
          return e;
        });
        return {
          ...prevState,
          order: newOrder,
          inOrder: [
            ...prevState.inOrder.slice(0, lastIndex),
            ...prevState.inOrder.slice(lastIndex + 1),
          ],
          totalPrice:
            prevState.totalPrice - this.findIngredientPrice(ingredient),
        };
      });
    }
  };

  render() {
    return (
      <main className="main">
        <Prices ingredients={this.state.products} />
        <Builder
          totalPrice={this.state.totalPrice}
          modalControl={this.onShowHideModal}
          inOrder={this.state.inOrder}
          message={this.state.message}
        />
        <Controls
          onHandleIngredientQuantity={this.onHandleIngredientQuantity}
          ingredients={this.state.products}
          count={this.state.order}
        />
        <CustomModal
          isOpen={this.state.isModalOpen}
          onShowHideModal={this.onShowHideModal}
          orderQuantity={this.state.order}
          totalPrice={this.state.totalPrice}
          setMessage={this.setMessage}
          cleanState={this.cleanState}
        />
      </main>
    );
  }
}

export default Burger;
