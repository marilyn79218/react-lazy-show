import React from 'react';
import PropTypes from 'prop-types';

import ApiUtil from './ApiUtil';

// import {
//   compose,
//   lifecycle,
// } from 'recompose';

// const Foo = () => (
//   <div>
//     <img
//       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0YFOOQ8qCxKlvMBYlWWEgIlXuVYmqphfxpyX1fl5k2TuH5XdaZ40YH22PGQ"
//       alt="pic"
//     />
//   </div>
// );

class Foo extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      url: null,
    };
  }

  // Do lots of ajax & computation for Foo Component
  componentDidMount() {
    ApiUtil.get().then(res => {
      const {
        uid,
      } = this.props;

      const url = res[(uid % res.length)].url;
      this.setState({
        url,
      });
    });
  }

  render() {
    return (
      <div>
        <img
          src={this.state.url}
          alt="pic"
        />
      </div>
    );
  }
}

// Foo.propTypes = {
//   selected: PropTypes.bool,
//   uid: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]),
//   onClick: PropTypes.func,
// };

// const hoc = compose(
//   withState('url', 'setUrl', null),
//   lifecycle({
//     componentDidMount() {
//       console.log('Foo componentDidMount');
//     },
//   }),
// );

export default Foo;
