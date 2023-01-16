import React from 'react';

import Header from './components/Header';
import axios from 'axios';

import Drawer from './components/Drawer';
import Home from './pages/Home';

export const AppContext = React.createContext({});
function App() {
  const [cardOpened, setCardOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cardItems, setCardItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const url = 'https://622557456c0e39662050d9d7.mockapi.io';

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemResponse = await axios.get(`${url}/items`);
        setIsLoading(false);

        setItems(itemResponse.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  const onRemoveItem = (id) => {
    setCardItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const addToCard = async (obj) => {
    console.log(obj);
    try {
      const findItem = cardItems.find((item) => Number(item.id) === Number(obj.id));
      if (findItem) {
        setCardItems((prev) => prev.filter((el) => Number(el.id) !== Number(obj.id)));
      } else {
        setCardItems((prev) => prev.concat(obj));
      }
    } catch (error) {
      alert(error);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const onFavorite = async (obj) => {
    try {
      if (favorites.find((el) => Number(el.id) === Number(obj.id))) {
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        setFavorites((prev) => prev.concat(obj));
      }
    } catch (error) {
      alert('failed to add`');
    }
  };

  const isItemAdded = (id) => {
    return cardItems.some((obj) => Number(obj.id) === Number(id));
  };
  console.log(cardItems);

  return (
    <div>
      <AppContext.Provider
        value={{
          favorites,
          items,
          cardItems,
          isItemAdded,
          onFavorite,
          setCardOpened,
          setCardItems,
          addToCard,
        }}>
        <div className="wrapper clear">
          <Drawer
            items={cardItems}
            onOpenCard={() => setCardOpened(false)}
            onRemove={onRemoveItem}
            opened={cardOpened}
          />
          <Header cardItems={cardItems} onOpenCard={() => setCardOpened(true)} />
          <Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            addToCard={addToCard}
            onFavorite={onFavorite}
            isLoading={isLoading}
          />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
