import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { Card } from '../core/Card';
import { Separator } from '../core/Separator';
import { RouteNames } from '../constants';
import { colors } from '../context/themes';
import { getCompanies, getCompany } from '../services/DiscoverService';


function CompanyDetail(props){
  const { name, type, description} = props;

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flexDirection: 'column'}}>
        <Button
          title={""}
          onPress={() => {}}
          type={ButtonType.BASIC}
          styles={{height: 50, width: 100, border: 'none'}}
        />
      </View>
      <View style={{flexDirection: 'column', marginLeft: 16}}>
        <Text style={{color: colors.textHighlight}}>{name}</Text>
        <Text style={{color: colors.textRegular, marginTop: 4}}>{type}</Text>
        <Text style={{color: colors.textLowlight, fontSize: 12, marginTop: 4}}>{description}</Text>
      </View>
    </View>
  );
}

function SingleView({selected, navigation}){
const handleBackPress = () => {
    navigation.goBack();
  }
  return (
    <View style={{margin: 16}}>
      <CompanyDetail {...selected} style={{margin: 16}} />
      <Separator />,
      <Text style={{color: colors.textHighlight, fontSize: 12, marginTop: 4}}>{`HQ: `}</Text>
      <Text style={{color: colors.textRegular, fontSize: 12, marginTop: 8}}>{`Total Offices: ${selected.offices}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10, marginTop: 4}}>{`Local Employees : ${selected.localEmployees}`}</Text>
      <Text style={{color: colors.textLowlight, fontSize: 10}}>{`Total Employees: ${selected.totalEmployees}`}</Text>
      <Separator style={{marginTop: 16, marginBottom: 8}} />
      <Button
        title={"Back"}
        onPress={handleBackPress}
        type={ButtonType.BASIC}
        styles={{color: colors.textLowlight, marginTop: 8 }}
      />
    </View>
  )
}

export function DiscoverCompanyProfile(props){

  const { navigation, companyId } = props;
  const company = getCompany(companyId);

  console.log("Rendering Discover CP")

  return (
    <View style={styles.container}>
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Explore the market
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8,}}>
          A long description
        </Text>
        <Card styles={{marginBottom: 32, width: 512}}>
          <SingleView selected={company} navigation={navigation} />
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: colors.textHighlight,
    fontSize: 18,
  }
});
