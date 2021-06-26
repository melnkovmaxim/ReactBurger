import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";

function App() {
  const [ingredients, setIngredients] = React.useState();

  React.useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
          .then(response => response.json())
          .then(json => setIngredients(json.data))
          .catch(error => setIngredients(error));
  }, [ingredients]);

  return (
    <>
      {ingredients
        ? (<div className="content">
            <div className="header">
              <AppHeader />
            </div>
            <div className="body">
              <BurgerIngredients ingredients={ingredients} />
              <div className="ml-5 mr-5" />
              <BurgerConstructor ingredients={ingredients} />
            </div>
          </div>)
        : (<div></div>)
      }
    </>
  );
}

export default App;