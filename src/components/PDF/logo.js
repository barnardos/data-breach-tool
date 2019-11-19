import React from "react";
import PropTypes from "prop-types";

import { Image, View } from "@react-pdf/renderer";
import styles from "./styles";

const Logo = ({ image }) => (
  <View style={styles.logoContainer}>
    <Image src={image} style={styles.logo} />
  </View>
);

Logo.propTypes = {
  image: PropTypes.string
};

export default Logo;
