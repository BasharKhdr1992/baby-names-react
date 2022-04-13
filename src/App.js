import './App.css';
import namesList from './data/names';
import CustomSpan from './CustomSpan';
import Input from './Input';
import { useState } from 'react';
import { compare } from './utils';

const App = () => {
  const [names, setNames] = useState(namesList);
  const [gender, setGender] = useState('a');
  const [searchVal, setSearchVal] = useState('');
  const [favourites, setFavourites] = useState([]);

  const handleInput = (e) => {
    setSearchVal(e.target.value);
  };

  const handleClick = (fav, id) => {
    if (fav) {
      handleDelete(id);
    } else {
      handleAdd(id);
    }
  };

  const handleDelete = (id) => {
    setFavourites((current) => {
      const tempFavs = current.filter((fav) => fav.id !== id);
      return tempFavs;
    });
  };

  const handleAdd = (id) => {
    let favName = names.find((name) => name.id === id);
    setFavourites((current) => {
      return current.concat(favName);
    });
  };

  const handleGenderSelection = (e) => {
    setGender(e.target.value);
  };

  const removeFavs = (list) => {
    return list.filter(
      (name) => favourites.findIndex((fav) => fav.id === name.id) === -1
    );
  };

  const applySearchFilter = () => {
    if (searchVal !== '') {
      return namesList.filter((item) =>
        item.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    } else {
      return namesList;
    }
  };

  const applyGenderFilter = (list) => {
    if (gender !== 'a') return list.filter((item) => item.sex === gender);
    else {
      return list;
    }
  };

  // sort alphabetically

  const sortedNames = removeFavs(
    applyGenderFilter(applySearchFilter(names))
  ).sort(compare);
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
      <div className="radio">
        <label htmlFor="male">male:&nbsp;&nbsp;</label>
        <input
          onChange={handleGenderSelection}
          id="male"
          type="radio"
          name="gender"
          value="m"
        />
        <label htmlFor="female">female:&nbsp;&nbsp;</label>
        <input
          onChange={handleGenderSelection}
          type="radio"
          id="female"
          name="gender"
          value="f"
        />
        <label htmlFor="all">all:&nbsp;&nbsp;</label>
        <input
          onChange={handleGenderSelection}
          type="radio"
          id="all"
          name="gender"
          value="a"
        />
      </div>
      <div className="favourites">
        <span className="title">favourites:&nbsp;&nbsp;</span>
        {sortedFavs.length > 0 &&
          sortedFavs.map((fav) => {
            const extraClass = fav.sex === 'm' ? 'boy-name' : 'girl-name';

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
          const extraClass = name.sex === 'm' ? 'boy-name' : 'girl-name';

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
