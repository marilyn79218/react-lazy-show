import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withState,
  lifecycle,
} from 'recompose';

import ApiUtil from './ApiUtil';


const Foo = ({
  url,
}) => (
  <div>
    <img
      src={url}
      alt="pic"
    />
  </div>
);

const hoc = compose(
  withState('url', 'setUrl', null),
  lifecycle({
    componentDidUpdate() {
      const { uid } = this.props;

      performance.mark(`Foo End - ${uid}`);
      performance.measure(`Foo Measure - ${uid}`, `Foo Start - ${uid}`, `Foo End - ${uid}`);
    },
    componentDidMount() {
      // Do lots of ajax & computation for Foo Component
      ApiUtil.get().then((res) => {
        const {
          uid,
        } = this.props;

        const url = res[(uid % res.length)].url;
        this.props.setUrl(url);
      });
    },
  }),
);


Foo.propTypes = {
  uid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  url: PropTypes.string,
};

export default hoc(Foo);
