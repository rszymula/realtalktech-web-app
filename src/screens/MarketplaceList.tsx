import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../core/Button';
import { Card } from '../core/Card';
import { Separator } from '../core/Separator';
import { RouteNames } from '../constants';
import { colors } from '../context/themes';
// import { getCompanies } from '../services/DiscoverService';
import { store } from '../store/basicStore';
import { ListItem } from '../common/ListItem';
import { Link } from '../core/Link';
import { getCompaniesWithPromos } from '../services/MarketplaceService';

function Company(props){
  const { id, name, type, description, previous, current, units, navigation} = props;

  const handleOnPress = () => {
    navigation.navigate(RouteNames.DISCOVER_COMPANY_PROFILE, {companyId: id})
  }

  const percentage = (previous - current) / previous
  const off = `${percentage?.toFixed(2) || ''}% off`
  const cur = `$${current} ${units}`
  const prev = `$${previous} ${units}`

  return (
    <ListItem
      heading={name}
      subheading={type}
      body={description}
      buttonLabel="View Profile"
      onPress={handleOnPress}
    >
      <View style={{alignItems: 'flex-end'}}>
        <Text style={{color: colors.link}}>{off}</Text>
        <Text style={{color: colors.textRegular, marginTop: 4}}>{cur}</Text>
        <Text style={{color: colors.textLowlight, fontSize: 12, marginTop: 4}}>{prev}</Text>
      </View>
    </ListItem>
  );
}

function ListView({companies, navigation}){
  return(
    <SafeAreaView>
      <FlatList
        style={{backgroundColor: colors.foreground}}
        data={companies}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Company {...item} navigation={navigation} />}
        ItemSeparatorComponent={() => <Separator style={{marginTop: 16, marginBottom: 16}} />}
      />
    </SafeAreaView>
  )
}

export function MarketplaceList(props){

  const { navigation } = props;

  const { getCompanies } = store;
  const companies = getCompaniesWithPromos(0, 5)

  return (
    <View style={styles.container}>
    {/* <View style={{justifyContent: 'flex-end'}}> */}
      <View style={{width: 512, alignItems: 'center'}}>
        <Text style={styles.title}>
          Marketplace
        </Text>
        <Text style={{color: colors.textLowlight, margin: 8}}>
          Premium listings and deals for the community
        </Text>
        <Card styles={{marginBottom: 32, width: 512}}>
          <ListView companies={companies} navigation={navigation} />
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