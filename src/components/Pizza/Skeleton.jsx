import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizzaBlock"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="133" cy="136" r="125" />
    <circle cx="142" cy="201" r="3" />
    <rect x="1" y="320" rx="13" ry="13" width="280" height="88" />
    <rect x="1" y="280" rx="18" ry="18" width="280" height="25" />
    <rect x="128" y="419" rx="25" ry="25" width="152" height="42" />
    <rect x="7" y="427" rx="18" ry="18" width="97" height="26" />
  </ContentLoader>
);

export default Skeleton;
