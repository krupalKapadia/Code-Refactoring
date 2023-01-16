import React from 'react';
import Card from '../components/Card';

function Home(props) {
  const renderItems = () => {
    return (
      props.isLoading
        ? [...Array(8)]
        : props.items.filter((item) => item.title.toLowerCase().includes(props.searchValue.toLowerCase()))
    ).map((item, index) => (
      <Card
        {...item}
        key={index}
        onPlus={(obj) => props.addToCard(obj)}
        onFavorite={(obj) => props.onFavorite(obj)}
        loading={props.isLoading}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        {props.searchValue ? (
          <h1 className="">Search by request: {props.searchValue}</h1>
        ) : (
          <h1 className="">All sneakers</h1>
        )}
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          <input onChange={props.onChangeSearchInput} value={props.searchValue} placeholder="Search..." />
          {props.searchValue ? (
            <img
              src="img/delete.svg"
              onClick={() => {
                props.setSearchValue('');
              }}
              alt="delete"
            />
          ) : null}
        </div>
      </div>
      <div className="d-flex wrap-style">{renderItems()}</div>
    </div>
  );
}
export default Home;
