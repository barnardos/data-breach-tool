import React from "react";
import { View, Text } from "@react-pdf/renderer";

import styles from "./styles";
import { countries } from "../../data/countries.json";

const getCountryDetails = countryName =>
  countries.find(
    country =>
      country.name ? country.name.toLowerCase() === countryName : false
  );

const mapCountryData = (countryData, data) =>
  data.map(row => [row.rowName || "", countryData[row.rowValue] || "---"]);

const parseCountryData = () => JSON.parse(sessionStorage.getItem("assessment"));

const buildCountryData = data => {
  const parsedCountryData = parseCountryData();

  const countryData =
    parsedCountryData && parsedCountryData.country
      ? getCountryDetails(parsedCountryData.country.value || {})
      : null;

  const descriptionData = countryData
    ? mapCountryData(countryData, data)
    : null;

  const countryDetails = descriptionData ? (
    descriptionData.map(row => {
      return (
        <View key={row[0]} style={styles.countryDetails.row}>
          <Text style={styles.countryDetails.dt}>{row[0]}:</Text>
          <Text style={styles.countryDetails.dd}>{row[1]}</Text>
        </View>
      );
    })
  ) : (
    <Text style={styles.paragraph}>Country unknown or unlisted</Text>
  );

  return (
    <View key={Math.random()} wrap={false}>
      {countryDetails}
    </View>
  );
};

export default buildCountryData;
