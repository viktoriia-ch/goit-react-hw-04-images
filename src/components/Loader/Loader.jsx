import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <ThreeCircles
        height="100"
        width="100"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#66b2b2"
        innerCircleColor="#008080"
        middleCircleColor="#006666"
      />
    </div>
  );
};

export default Loader;
