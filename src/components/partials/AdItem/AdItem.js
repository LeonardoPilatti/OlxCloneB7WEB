import React from 'react';
import styles from './AdItem.module.css';
import { Link } from 'react-router-dom';

const AdItem = ({ data }) => {
  let [price, setPrice] = React.useState();

  if (data.priceNegotiable) {
    price = 'Preço Negociável';
  } else {
    price = `RS ${data.price}`;
  }

  return (
    <div className={styles.AdItem}>
      <Link to={`/ad/${data.id}`}>
        <div className={styles.itemImage}>
          <img src={data.image} alt="" />
        </div>
        <div className={styles.itemName}>{data.title}</div>
        <div className={styles.itemPrice}>{price}</div>
      </Link>
    </div>
  );
};

export default AdItem;
