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
const elements = Array(3).fill(0).map((_, index) => (
  {
    id: index,
  }
));

/* eslint-disable */
class App extends React.PureComponent {
  componentDidMount() {
    const observer = new PerformanceObserver(function(list, obj) {
      const entries = list.getEntries();
      entries.forEach(entry => {
        // Then you can try to observe the measure period between Console Tab and Chrome User Timing Section
        if (entry.name.indexOf('Foo Measure') > -1)
          console.log('entry name', entry.name , entry)
      });
    });
    observer.observe({entryTypes: ["measure"]});
  }

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
