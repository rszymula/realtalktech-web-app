import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ButtonType, Button } from '../../components/core/Button';
import { Card } from '../../components/core/Card';
import { colors } from '../../context/themes';
// import { getCompanies, getCompany } from '../services/DiscoverService';
import { store } from '../../state/basicStore';


export function ProfileSettings(props){

  const { navigation, route } = props;

  const { getUser } = store;
  const user = getUser();

  return (
    <View style={styles.container}>
      <Text style={styles.h2}>
        Your Profile
      </Text>
      <Button title="Edit Profile" onPress={() => {}} type={ButtonType.BASIC} styles={{alignSelf: 'flex-start', marginTop: 8, color: colors.textRegular, backgroundColor: colors.foreground}}/>
      <Text style={styles.title}>
        {`@${user.username}`}
      </Text>
      <Text style={{color: colors.textRegular, margin: 8,}}>
        {`${user.firstName} ${user?.lastName || ''}`}
      </Text>
      <Card styles={{backgroundColor: colors.input, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.captionText}>{"Bio"}</Text>
          <Text style={{maxWidthX: 512, color: colors.textRegular, marginTop: 8 }}>{user.bio}</Text>
        </View>
      </Card>
      <Text style={styles.h2}>
        Your Tech Stack
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 18,
  },
  h2: {
    marginTop: 8,
    color: colors.textHighlight,
    fontSize: 16,
  },
  captionText: {
    color: colors.textRegular,
    fontSize: 12,
  },
  techItem: {
    // borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.foreground,
    color: colors.textRegular,
    margin: 4,
    padding: 4,
  }
});


