import React, { useState, useEffect, useMemo } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import Loading from '../components/Loading';
import './App.css';

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [count, setCount] = useState(0); // for demo purposes

  useEffect(() => {
    const fetchRobots = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      setRobots(users);
    };
    fetchRobots();
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = useMemo(
    () =>
      robots.filter((robot) =>
        robot.name.toLowerCase().includes(searchfield.toLowerCase())
      ),
    [robots, searchfield]
  );

  return (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        {robots.length ? (
          <CardList robots={filteredRobots} />
        ) : (
          <Loading />
        )}
      </Scroll>
    </div>
  );
}

export default App;