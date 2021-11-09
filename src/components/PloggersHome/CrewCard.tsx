import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { crewData } from './dummy';

const gap = Dimensions.get('window').width * 0.025;
const offset = Dimensions.get('window').width * 0.125;
const deviceWidth = Dimensions.get('window').width * 0.7;

const Carousel: React.FC = () => {
  return (
    <View style={[styles.container]}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={crewData}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.id}`}
        pagingEnabled
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.imageWrapper]}>
            <View style={[styles.image, { backgroundColor: item.color }]}>
              <Text style={[styles.crewName]}>{item.name}</Text>
              <Text style={[styles.crewRanking]}>{item.ranking}</Text>
              <Text style={[styles.crewTown]}>{item.town}</Text>
            </View>
          </TouchableOpacity>
        )}
        snapToInterval={deviceWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: { width: deviceWidth, height: 100, marginHorizontal: gap / 2 },
  image: {
    height: '100%',
    borderRadius: 20,
  },
  crewName: {
    color: '#101010',
    fontSize: 24,
  },
  crewRanking: {
    color: 'red',
    fontSize: 24,
  },
  crewTown: {
    color: 'gray',
    fontSize: 24,
  },
});

export default Carousel;
