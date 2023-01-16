import React, {useContext} from 'react';
import { AppContext } from '../App';

function Info(props) {
  const { setCardOpened } = useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={props.image} alt="empty" />
      <h2>{props.title}</h2>
      <p className="pacity-6">{props.description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="img/left-arrow.png" alt="arrow" />
        come back
      </button>
    </div>
  );
}
export default Info;
