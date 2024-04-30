import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { Fragment } from "react";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
    justifyContent: "flex-start",
    width: "50%",
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ data }) => (
  <Fragment>
    <View>
      <Text>{data?.direction}</Text>
      <Text>{data?.employee_name}</Text>
      <Text>{data?.faculty}</Text>
      <Text></Text>
      <Text></Text>
    </View>
  </Fragment>
);

export default BillTo;
