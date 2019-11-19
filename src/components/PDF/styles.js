import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 16
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignContent: "stretch",
    alignItems: "flex-start"
  },
  logo: {
    width: 150,
    height: 40
  },
  danger: {
    backgroundColor: "#f3cccc"
  },
  warning: {
    backgroundColor: "#f1a766"
  },
  info: {
    backgroundColor: "#e8e8e8"
  },
  positive: {
    backgroundColor: "#e1edcc"
  },
  section: {
    padding: 0,
    marginTop: 16,
    marginRight: 0,
    marginLeft: 0
  },
  output: {
    padding: 12,
    marginBottom: 8
  },
  innerSection: {
    padding: 0,
    marginTop: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "stretch",
    maxWidth: "100%",
    width: "100%"
  },
  innerSectionAnswer: {
    flex: "0 0 auto",
    width: "20%",
    backgroundColor: "#d2d2d2",
    padding: 8
  },
  innerSectionLegend: {
    flex: "1 0 auto",
    width: "80%",
    padding: 8,
    backgroundColor: "#ededed"
  },
  paragraph: {
    fontSize: 12
  },
  paragraphReason: {
    marginTop: 10
  },
  pagination: {
    fontSize: 8,
    textAlign: "center"
  },
  paragraph12: {
    fontSize: 12
  },
  paragraphMB: {
    marginBottom: 8
  },
  paragraphMT4: {
    marginTop: 4
  },
  paragraphMT12: {
    marginTop: 12
  },
  headingOne: {
    marginBottom: 10,
    fontSize: 20,
    width: "100%"
  },
  headingTwo: {
    fontSize: 16,
    width: "100%"
  },
  headingThree: {
    fontSize: 14,
    width: "100%"
  },
  title: {
    fontSize: 26,
    marginBottom: 10,
    width: "100%"
  },
  mainView: {
    margin: 0
  },
  countryDetails: {
    dt: {
      flex: "0 0 auto",
      width: "25%",
      fontSize: 13,
      paddingRight: 10,
      textAlign: "right"
    },
    dd: {
      flex: "1 0 auto",
      width: "75%",
      fontSize: 12
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "stretch",
      maxWidth: "100%",
      width: "100%"
    }
  },
  table: {
    first: {
      width: "25%",
      fontSize: 13
    },
    th: {
      width: "18%",
      fontSize: 13
    },
    td: {
      width: "18%"
    },
    base: {
      padding: 8,
      fontSize: 12
    },
    baseBackground: {
      backgroundColor: "#e8e8e8"
    },
    tr: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between",
      alignContent: "stretch",
      alignItems: "stretch"
    }
  }
});

export default styles;
