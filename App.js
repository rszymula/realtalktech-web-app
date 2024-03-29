import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from './src/Root';
import { TestRoot } from './src/TestRoot';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <Root />
      {/* <TestRoot /> */}
      {/* <Text style={{position: 'absolute', bottom: 20, right: 0, color: colors.textRegular}}>{"LKSDJF"}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e111c",
  },
})
