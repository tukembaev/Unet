import { Fragment } from "react";
import React from "react";
import {
  Page,
  Document,
  StyleSheet,
  Image,
  View,
  Text,
} from "@react-pdf/renderer";
import BillTo from "./Test";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 84,
    height: 70,
    marginLeft: "auto",
    marginRight: "auto",
  },
  table:{
    borderRadius: 6,
    borderSpacing: 0,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    backdropFilter: 'blur(10px)',
    minWidth: '1200px',
  },
  
  table__head:{
    background: 'white',
    width: '100%',
  }

});

const StudyPlanPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <BillTo data={data}/>
      </Page>
    </Document>
  );
};
export default StudyPlanPDF;

        // <View style={styles.table}>
        //   <View style={styles.table__head}>
        //     <View style={styles.table__row}>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>№</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>
        //           Наименование предмета
        //         </Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>Кафедра</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>Тип</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>Форма контроля</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>Кредит</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>
        //           Общие академические часы
        //         </Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>На лекцию</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>На практику</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>На лаб.работы</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>СРС</Text>
        //       </View>
        //       <View style={styles.table__head_item}>
        //         <Text style={styles.table__head_title}>Всего</Text>
        //       </View>
        //     </View>
        //   </View>
        // </View>