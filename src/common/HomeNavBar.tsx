import React from 'react';
import { Text, View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { colors } from '../context/themes';
import { Button, ButtonType } from '../core/Button';
import REALTALKTECH_WHITE from '../../assets/titleWhite.png';
import { defaultTab } from '../constants';


const tabs = [
  {
    routeName: "DiscussHome",
    title: "Discuss"
  },
  {
    routeName: "DiscoverHome",
    title: "Discover"
  },
  {
    routeName: "BuyerAIHome",
    title: "Buyer AI"
  },
]

export function HomeNavBar(props){

  const layout = useWindowDimensions();

  const {navigation} = props;

  const navState = navigation.getState()
  const currentRouteName = navState.routes?.[navState.routes.length - 1]?.name ?? '';

  const handleTabPress = (tab) => {
    navigation.navigate(tab.routeName)
    // setActiveTab(tab.routeName);
  }

  const handleAddProfilePress = () => {
    navigation.navigate("ProfileCreateHome")
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: 'red', borderWidth: 1}}>
        <Image source={REALTALKTECH_WHITE} style={{width: 192, height: 24, borderColor: 'yellow', borderWidth: 1}}/>
          <View style={styles.topBar}>
            {
              tabs.map(tab => {
                return (
                  <Button title={tab.title} onPress={() => handleTabPress(tab)} styles={styles.tabButton} type={tab.routeName === currentRouteName ? ButtonType.LOUD : ButtonType.BASIC}/>
                );
              })
            }
          </View>
        <Button title={"+"} onPress={handleAddProfilePress} type={ButtonType.BASIC} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.background,
    // // flexDirection: 'row',
    // padding: 32,
    // borderWidth: 1,
    // borderColor: 'purple'
  },
  title: {
    // paddingTop: 8,
    // paddingBottom: 8,
    padding: 16,
    // borderWidth: 1,
    // borderColor: 'green'
  },
  body: {
    // flexDirection: 'row',
    marginLeft: 32,
    borderWidth: 1,
    borderColor: 'red'
  },
  topBar: {
    width: 256,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginLeft: 4,
    // marginRight: 4,
    // alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'yellow'
  },
  tabButton: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 2,
    fontSize: 12,
  },
  content: {
    borderWidth: 1,
    borderColor: 'lightGray'
  },
  sideBar: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  categories: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: 'yellow'
  },
});