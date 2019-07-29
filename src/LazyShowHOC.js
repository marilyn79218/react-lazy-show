import React from 'react';

const DEFAULT_STYLE = {
  WIDTH: '100px',
  HEIGHT: '100px',
};
const getAnchorStyle = (width, height) => {
  if (width && height) {
    return {
      width,
      height,
    };
  }

  return {
    minWidth: DEFAULT_STYLE.WIDTH,
    minHeight: DEFAULT_STYLE.HEIGHT,
  };
};

const LazyShowHOC = ({ width, height }) => (Component) => {
  class LazyShow extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        canShow: false,
      };
    }

    componentDidMount() {
      const option = { root: null }; // Where null indicates viewport
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) this.setState({ canShow: true });
        });
      }, option);
      intersectionObserver.observe(this.divAnchor);
    }

    render() {
      const { canShow } = this.state;

      return (
        <div
          ref={(node) => { this.divAnchor = node; }}
          style={getAnchorStyle(width, height)}
        >
          {
            canShow ?
              <Component {...this.props} /> :
              'Placeholder'
          }
        </div>
      );
    }
  }

  return LazyShow;
};


export default LazyShowHOC;
