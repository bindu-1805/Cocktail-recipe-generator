import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [cocktail, setCocktail] = useState(null);

  const fetchRandomCocktail = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      setCocktail(response.data.drinks[0]);
    } catch (error) {
      console.error('Error fetching the cocktail', error);
    }
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  return (
    <div className="app">
      <h1>Random Cocktail Generator</h1>
      {cocktail ? (
        <div className="cocktail-card">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
          <h2>{cocktail.strDrink}</h2>
          <p><strong>Category:</strong> {cocktail.strCategory}</p>
          <p><strong>Glass:</strong> {cocktail.strGlass}</p>
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(cocktail)
              .filter(key => key.startsWith('strIngredient') && cocktail[key])
              .map(key => (
                <li key={key}>
                  {cocktail[key]} - {cocktail[`strMeasure${key.match(/\d+/)[0]}`]}
                </li>
              ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{cocktail.strInstructions}</p>
          <button onClick={fetchRandomCocktail}>Get Another Cocktail</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
