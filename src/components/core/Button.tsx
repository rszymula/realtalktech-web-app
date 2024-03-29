import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import { colors } from "../../context/themes";

export enum ButtonType {
  BASIC = 'Basic',
  LOUD = 'Loud',
  REVERSE = 'Reverse',
  BARE = 'Bare',
}

const base = {
  borderWidth: 1,
  borderRadius: 4,
  fontSize: 12,
  alignSelf: 'center',
  flexDirection: 'row',
};

export const buttonTypetoStyle = {
  [ButtonType.BASIC]: {
    ...base,
    backgroundColor: colors.input,
    borderColor: colors.border,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    color: colors.textRegular,
  },
  [ButtonType.LOUD]: {
    ...base,
    backgroundColor: colors.link,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderColor: colors.link,
  },
  [ButtonType.REVERSE]: {
    ...base,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderColor: colors.link,
    backgroundColor: colors.input,
    color: colors.textHighlight,
  },
  [ButtonType.BARE]: {
    ...base,
    backgroundColor: colors.background,
    borderColor: colors.background,
    color: colors.textRegular,
    paddingTop: 4,
    alignSelf: 'flex-start',
  },
}

export function Button({onPress, title = null, image = null, imageSize=16, imageWidthRatio=1, type = ButtonType.LOUD, textStyle = {}, styles = {}}){
  const typeStyle = buttonTypetoStyle[type]

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[typeStyle, styles]}>
        {image && 
          <View>
            <Image source={image}  
              style={{
                margin: 2,
                width: imageSize * imageWidthRatio,
                height: imageSize,
                // borderColor: 'red',
                // borderWidth: 1,
              }} 
            />
          </View>
        }
        {title && <Text style={[{marginLeft: 2, color: typeStyle.color, fontSize: typeStyle.fontSize}, textStyle]}>{title}</Text>}
      </View>
    </TouchableOpacity>
  );
}
