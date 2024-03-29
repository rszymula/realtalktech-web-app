import { View, TouchableOpacity, Image } from "react-native";
import { colors } from "../../context/themes";
import REALTALKTECH_WHITE from '../../assets/titleWhite.png'
import LOGO_V2 from '../../assets/logo_v2.png';
import BACK from '../../assets/back.png';
import { RawDiscussCreatePost } from "../../screens/discuss/DiscussCreatePost";
import { connect } from "../../state/reduxStore";
import { TopBanner } from "./TopBanner";

export function RawAlternateNavBar({navigation, apiCallResult, dispatch}){

  const handleBackPress = () => {
    navigation.pop(1) // .goBack();
  }

  if(apiCallResult?.active){
    setTimeout(() => {
      dispatch({type: "API_CALL_RESULT", payload: {...apiCallResult, active: !apiCallResult.active}})
    }, 4000)
  }

  return (
    <>
      {apiCallResult?.active && <TopBanner apiCallResult={apiCallResult}/>}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity onPress={handleBackPress} style={{margin: 8, padding: 8, borderColor: colors.border, borderWidth: 1, backgroundColor: colors.input, borderRadius: 4}}>
          <Image source={BACK} style={{width: 12, height: 12}} />
        </TouchableOpacity>
        {/* <Image source={REALTALKTECH_WHITE} style={{width: 256, height: 32}}/> */}
        {/* <Image source={REALTALKTECH_WHITE} style={{width: 128, height: 16, borderColor: 'red', borderWidthX: 1}}/> */}
        <Image source={LOGO_V2} style={{width: 92, height: 20, borderColor: 'red', borderWidthX: 1}}/>
        <View style={{margin: 8, padding: 8, width: 12, height: 12, borderColor: 'red', borderWidthX: 1}}>
        </View>
      </View>
    </>
  )
};

const stp = (state) => ({
  apiCallResult: state.apiCallResult
})
const dtp = (dispatch, getState) => ({
  dispatch
});
export const AlternateNavBar = connect(stp, dtp)(RawAlternateNavBar);
