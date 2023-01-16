import Info from '../Info';
import React from 'react';
import { AppContext } from '../../App';

import styles from './Drawer.module.scss';
const randomNumber = () => Math.floor(Math.random() * (5000 - 1000) + 1000);

function Drawer(props) {

  const { onOpenCard, items = [], onRemove, opened } = props;
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const { setCardItems, cardItems } = React.useContext(AppContext);

  const totalPrice = cardItems.reduce((sum, obj) => Number(obj.price) + sum, 0);
  
  const onClickOrder = async () => {
    setOrderId(randomNumber());
    setIsOrderCompleted(true);
    setCardItems([]);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h3 className="mb-30 d-flex justify-between ">
          basket
          <img onClick={onOpenCard} src="img/delete.svg" className="removeBtn cu-p" alt="" />
        </h3>
        {items.length > 0 ? (
          <div>
            <div className="d-flex flex-column flex">
              <div className="items flex">
                {items.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                    <div
                      style={{ backgroundImage: `url(${obj.url})` }}
                      className="cartItemImg"></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>$ {obj.price}.</b>
                    </div>
                    <img
                      src="img/delete.svg"
                      className="removeBtn"
                      onClick={() => onRemove(obj.id)}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Total:</span>
                  <div></div>
                  <b>$ {totalPrice}.</b>
                </li>
                <li className="d-flex">
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>$ {Math.ceil(totalPrice * 0.05)}.</b>
                </li>
              </ul>
              <button className="greenButton " onClick={onClickOrder}>
                  checkout
                <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </ div>
        ) : (
          isOrderCompleted ? 
          <Info
          description={'Your order #' + orderId + ' will soon be handed over to courier delivery'}
          title='Order is processed!'
          image='img/complete-order.png' /> :
          <Info
            description='Add at least one pair of sneakers to order.'
            title='Cart is empty'
            image='img/empty-cart.jpg'
          />
        )}
      </div>
    </div>
  );
}
export default Drawer;
