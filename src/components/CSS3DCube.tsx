export default function CSS3DCube() {
  return (
    <div className="fixed top-1/4 right-1/4 pointer-events-none z-5">
      <div className="scene-3d">
        <div className="cube-3d">
          <div className="cube-face cube-front"></div>
          <div className="cube-face cube-back"></div>
          <div className="cube-face cube-right"></div>
          <div className="cube-face cube-left"></div>
          <div className="cube-face cube-top"></div>
          <div className="cube-face cube-bottom"></div>
        </div>
      </div>
    </div>
  );
}
