import React from 'react';

import {
  LazyShowHOC,
} from '../src';

import Foo from './Foo';

const config = {
  width: '160px',
  height: '160px',
  showTime: 2000,
};
const LazyFoo = LazyShowHOC(config)(Foo);
const elements = Array(50).fill(0).map((_, index) => (
  {
    id: index,
  }
));


class App extends React.PureComponent {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
        }}
      >
        {
          elements.map(ele => (
            <LazyFoo
              key={ele.id}
              uid={ele.id}
            />
          ))
        }
      </div>
    );
  }
}

export default App;
