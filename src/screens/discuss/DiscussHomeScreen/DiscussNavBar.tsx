import { Text, View, StyleSheet } from 'react-native';
import { CategoryNames, categories } from '../../../constants';
import { Button, ButtonType, buttonTypetoStyle } from '../../../common/Button';

export function DiscussNavBar(props){

  console.log("Whatever")

  const { handleSetCurrentCategory } = props;

  const handleCategoryPress = (category: CategoryNames) => {
    console.log('pressed', category)
    handleSetCurrentCategory(category);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>CATEGORIES</Text>
      <View style={styles.categoriesContainer}>
        {categories.map(category => {
          return <Button
            title={category.name}
            onPress={() => handleCategoryPress(category.name)}
            type={ButtonType.BARE}
          />
        })}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "30%",
    // borderColor: 'red',
    // borderWidth: 2,
    // paddingLeft: 32,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  title: {
    ...buttonTypetoStyle[ButtonType.BARE],
    fontSize: 12,
  }
})
