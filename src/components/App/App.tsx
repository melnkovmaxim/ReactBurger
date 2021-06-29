import React from "react";
import componentStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
          .then(response => response.json())
          .then(json => setIngredients(json.data))
          .catch(error => setError(error));
  }, []);

  return (   
    <>
      {ingredients
        ? (
          <div className={componentStyles.content}>
            <div className={componentStyles.header}>
              <AppHeader />
            </div>
            <div className={componentStyles.body}>
              <BurgerIngredients ingredients={ingredients} />
              <div className="ml-5 mr-5" />
              <BurgerConstructor ingredients={ingredients} />
            </div>
          </div>
        )
        : (<div>{error}</div>)
      }
    </>
  );
}

export default App;