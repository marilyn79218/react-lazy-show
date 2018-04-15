# react-lazy-show


Inspired by [High Performance React Progressive Web Apps](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)

## Feature
Lazy load your component that matters performance only if it has exist in the viewport for a constant time.

```js
LazyShowHOC({
  width: string,
  height: string,
  showTime: number,
})(HTMLElement || React.Node): HigherOrderComponent
```

## Example

```js
import React from 'react';
import { LazyShowHOC } from 'react-lazy-show';

class Foo extends React.Component {
  this.state = {
    imgUrl: '',
  };

  componentDidMount() {
    // Do lots of ajax & computation to render Foo Component
    const {
      instanceId,
    } = this.props;

    fetchImg(instanceId).then(({ url }) => this.setState({ imgUrl: url }));
  }

  render() {
    return (
      <div>
        <img
          src={url}
          alt="pic"
        />
      </div>
    )
  }
}

const config = {
  width: '160px',
  height: '160px',
  showTime: 2000,
};
const LazyFoo = LazyShowHOC(config)(Foo);
const elements = [1, 2, 3, 4, 5, 6, 7];

class App extends React.Component {
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
              key={ele}
              instanceId={ele}
            />
          ))
        }
      </div>
    );
  }
}

```

## Development
```sh
yarn start
```

the demo page will served on port **5000**
