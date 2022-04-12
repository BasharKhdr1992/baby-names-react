import './App.css';
import namesList from './data/names';
import CustomSpan from './CustomSpan';
import Input from './Input';
import { useState } from 'react';
import { compare } from './utils';

const App = () => {
  const [names, setNames] = useState(namesList);
  const [favourites, setFavourites] = useState([]);

  const handleInput = (e) => {
    const searchVal = e.target.value;
    if (searchVal !== '') {
      const filteredNames = namesList.filter((n) =>
        n.name.toLowerCase().includes(searchVal.toLowerCase())
      );
      setNames(removeFavs(filteredNames));
    } else {
      setNames(removeFavs(namesList));
    }
  };

  const removeFavs = (list) => {
    return list.filter(
      (name) => favourites.findIndex((fav) => fav.id === name.id) === -1
    );
  };

  const handleClick = (fav, id) => {
    if (fav) {
      handleDelete(id);
    } else {
      handleAdd(id);
    }
  };

  const handleDelete = (id) => {
    let tempName = favourites.find((fav) => fav.id === id);
    setFavourites((current) => {
      const tempFavs = current.filter((fav) => fav.id !== id);
      return tempFavs;
    });
    setNames((current) => {
      return current.concat(tempName);
    });
  };

  const handleAdd = (id) => {
    let favName = names.find((name) => name.id === id);
    setNames((current) => {
      return current.filter((fav) => fav.id !== id);
    });
    setFavourites((current) => {
      return current.concat(favName);
    });
  };

  // sort alphabetically
  const sortedNames = names.sort(compare);
  const sortedFavs = favourites.sort(compare);

  return (
    <div className="main">
      <div>
        <Input
          type={'text'}
          onChange={handleInput}
          placeholder={'e.g. bashar'}
        />
      </div>
      <div className="favourites">
        <span className="title">favourites:&nbsp;&nbsp;</span>
        {sortedFavs.length > 0 &&
          sortedFavs.map((fav) => {
            const extraClass = fav.sex === 'f' ? 'boy-name' : 'girl-name';

            return (
              <CustomSpan
                handleClick={(id) => handleClick(true, id)}
                fav={true}
                className={extraClass}
                id={fav.id}
                key={fav.id}
              >
                {fav.name}
              </CustomSpan>
            );
          })}
      </div>
      <div className="names-container">
        {sortedNames.map((name) => {
          const extraClass = name.sex === 'f' ? 'boy-name' : 'girl-name';

          return (
            <CustomSpan
              handleClick={(id) => handleClick(false, id)}
              className={extraClass}
              key={name.id}
              id={name.id}
            >
              {name.name}
            </CustomSpan>
          );
        })}
      </div>
    </div>
  );
};

export default App;
