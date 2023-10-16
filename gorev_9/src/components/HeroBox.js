import React from "react";

import "./HeroBox.css";
import AddCityDrawer from "./AddCityDrawer";

function HeroBox(props) {
  const onSaveCityDataHandler = (enteredCityData) => {
    props.onAddCityData(enteredCityData);
  };
  return (
    <div className="container">
      <div className="hero-img"></div>
      <div className="content">
        <h1 className="main-header">
          Şehir seçerek hava durumunu öğrenebilirsiniz.
        </h1>
        <h5 className="expl-header">Şehrini seç ve hava durumunu öğren.</h5>
        <AddCityDrawer onSaveCityData={onSaveCityDataHandler}></AddCityDrawer>
      </div>
    </div>
  );
}

export default HeroBox;
