import React from 'react';

const isUpper = (top, bottom) => top < 0 && bottom < 0;
const isLower = (top, iH) => top > iH;
const isLefter = (left, right) => left < 0 && right < 0;
const isRighter = (left, iW) => left > iW;

const CONFIRM_SHOW_TIME = 2000;
const PERIOD = 1000;

const DEFAULT_STYLE = {
  WIDTH: '100px',
  HEIGHT: '100px',
};
const getAnchorStyle = (width, height) => {
  if (width && height) {
    return {
      width,
      height,
    }
  }

  return {
    minWidth: DEFAULT_STYLE.WIDTH,
    minHeight: DEFAULT_STYLE.HEIGHT,
  };
}

// Description: 當 children 持續出現在畫面中超過 CONFIRM_SHOW_TIME，才會 render。
const LazyShowHOC = (width, height) => Component => {
  class LazyShow extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isInside: false,
        canShow: false,
      };

      this.periodTimer = null;
      this.spentTime = 0;
    }

    scrollHandler = () => {
      console.log('scrollHandler');
      const { canShow } = this.state;
      const isEleInside = !this.isOutside();

      if (isEleInside && !canShow) {
        this.setState({ isInside: true });
        console.log('   window scroll - isInside', isEleInside);

        if (!this.periodTimer) {
          this.periodTimer = setInterval(() => {
            let isCurrentOutside = this.isOutside();
            console.log('   interval isCurrentIside', !isCurrentOutside);
            if (isCurrentOutside) {
              this.spentTime = 0;
              this.setState({ isInside: false });
              this.removeTimer();
              return;
            }

            this.spentTime += PERIOD;
            console.log('   spentTime', this.spentTime);
            if (this.spentTime >= CONFIRM_SHOW_TIME) {
              console.log('   canShow');
              this.spentTime = 0;
              this.setState({ canShow: true });
              this.removeTimer();
            }
          }, PERIOD);
        }
      }
    }

    componentDidMount() {
      this.scrollHandler();
      window.addEventListener('scroll', this.scrollHandler);
    }

    removeTimer = () => {
      if (this.periodTimer) {
        clearInterval(this.periodTimer);
        this.periodTimer = null;
      }
    }

    isOutside = () => {
      if (!this.divAnchor) {
        return true;
      }

      const {
        top,
        left,
        bottom,
        right,
      } = this.divAnchor.getBoundingClientRect();
      const {
        innerHeight,
        innerWidth,
      } = window;

      const isEleLefter = isLefter(left, right);
      const isEleUpper = isUpper(top, bottom);
      const isEleLower = isLower(top, innerHeight);
      const isEleRighter = isRighter(left, innerWidth);

      return (isEleLefter || isEleUpper || isEleLower || isEleRighter);
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
}


export default LazyShowHOC;
