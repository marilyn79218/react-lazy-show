import React from 'react';

import {
  LazyShowHOC,
} from '../src';

import Foo from './Foo';

const LazyFoo = LazyShowHOC('160px', '160px')(Foo);
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
