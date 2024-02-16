import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { RouteNames, tabs } from '../../constants/constants';
import { Link } from '../core/Link';
import { colors } from '../../context/themes';

export function HomeBottomBar(props){

  const {navigation, Component} = props;

  return (
    <View style={{flexDirection: 'column', borderColor: 'green', borderWidth: 1}}>
      <Component {...props} />
      <View style={styles.container}>
        <View style={styles.links}>
          {tabs.map(tab => <Link textLink={tab.title} onPress={() => {navigation.navigate(tab.routeName)}} style={styles.link} />)}
          <Link textLink={"Contact Us"} onPress={() => {navigation.navigate(RouteNames.PROFILE_CONTACT_US)}} style={styles.link} />
        </View>
        <Text style={{fontSize: 12, color: colors.textRegular, alignSelf: 'center', marginTop: 8}}>{`@RealTalk ${new Date().getFullYear()}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  links: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 16,
    // marginLeft: 64,
    // marginRight: 64,
  },
  link: {
    margin: 4,
  },
});