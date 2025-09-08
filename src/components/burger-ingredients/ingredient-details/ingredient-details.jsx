import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ item }) => {
  const renderInfo = ({ title, value }) => {
    return (
      <div className={`pr-5 ${styles.detail}`}>
        <span>{title}</span>
        <span className="pt-1 text text_type_digits-default">{value}</span>
      </div>
    );
  };

  return (
    <div className={styles.content}>
      <img className={styles.image} src={item.image} />
      <span className="text text_type_main-medium pt-4">{item.name}</span>
      <div
        className={`pl-5 pt-8 pb-15 text text_type_main-default text_color_inactive ${styles.info}`}
      >
        {renderInfo({ title: 'Калории, ккал', value: item.calories })}
        {renderInfo({ title: 'Белки, г', value: item.proteins })}
        {renderInfo({ title: 'Жиры, г', value: item.fat })}
        {renderInfo({ title: 'Углеводы, г', value: item.carbohydrates })}
      </div>
    </div>
  );
};
