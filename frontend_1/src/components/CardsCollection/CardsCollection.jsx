import Card from "../Card/Card";

import styles from "./CardsCollection.module.css";
const CardsCollection = ({ data, extension_path }) => {
  return (
    <div className={styles.cards}>
      {data.map((item) => (
        <Card
          extension_path={extension_path}
          key={item._id}
          data={item}
          id={item._id}
        />
      ))}
    </div>
  );
};

export default CardsCollection;
