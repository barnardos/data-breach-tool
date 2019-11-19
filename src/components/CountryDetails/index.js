import React, { Component } from "react";
import PropTypes from "prop-types";

import DescriptionList from "../DescriptionList";

import { countries } from "../../data/countries.json";

import "./index.css";
import Paragraph from "../Paragraph";

class CountryDetails extends Component {
  getCountryDetails = countryName =>
    countries.find(
      country =>
        country.name ? country.name.toLowerCase() === countryName : false
    );

  mapCountryData = countryData =>
    this.props.data.map(row => [
      row.rowName || "",
      countryData[row.rowValue] || "---"
    ]);

  parseCountryData = () => JSON.parse(sessionStorage.getItem("assessment"));

  render() {
    const parsedCountryData = this.parseCountryData();

    const countryData =
      parsedCountryData && parsedCountryData.country
        ? this.getCountryDetails(parsedCountryData.country.value || {})
        : null;

    const descriptionData = countryData
      ? this.mapCountryData(countryData)
      : null;

    return (
      <div className="CountryDetails">
        {descriptionData && <DescriptionList data={descriptionData} />}
        {!descriptionData && <Paragraph>Country unknown or unlisted</Paragraph>}
      </div>
    );
  }
}

CountryDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      rowName: PropTypes.string,
      rowValue: PropTypes.string
    })
  )
};

export default CountryDetails;
