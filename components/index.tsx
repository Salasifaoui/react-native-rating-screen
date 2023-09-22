/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable no-use-before-define */
import { HStack, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

export interface RatingScreenProps {
  startingValue?: number;
  ratingCount?: number;
  imageSize?: number;
  ratingColor?: string;
  ratingBackgroundColor?: string;
  onFinishRating?: (rating: number) => void;
  type?: 'star' | 'smile' | 'heart';
  readOnly?: boolean;
}

export default function RatingScreen({
  startingValue = 0,
  ratingCount = 5,
  imageSize = 40,
  ratingColor = 'gold',
  ratingBackgroundColor = 'transparent',
  onFinishRating = () => {},
  readOnly = false,
  type = 'star',
}: RatingScreenProps) {
  const [select, setSelect] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const selectItemStar = [];

  function onStarRatingPress(startingValue) {
    if (startingValue !== 0) {
      for (let index = 0; index < startingValue; index++) {
        selectItemStar.push(index);
      }
    }

    setSelectItem(selectItemStar);
    onFinishRating(startingValue);
  }
  useEffect(() => {
    onStarRatingPress(startingValue);
  }, [startingValue]);

  return (
    <HStack space={1} justifyContent="center" alignItems="center" bg={ratingBackgroundColor}>
      {[...Array(ratingCount)].map((_, i) =>
        readOnly ? (
          <Text fontSize={imageSize} color={selectItem.includes(i) ? ratingColor : 'lightgrey'}>
            {type === 'smile' && '☻'}
            {type === 'star' && '★'}
            {type === 'heart' && '♡'}
          </Text>
        ) : (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setSelect(!select);
              onStarRatingPress(i + 1);
            }}>
            <Text fontSize={imageSize} color={selectItem.includes(i) ? ratingColor : 'lightgrey'}>
              {type === 'smile' && '☻'}
              {type === 'star' && '★'}
              {type === 'heart' && '♡'}
            </Text>
          </TouchableOpacity>
        )
      )}
    </HStack>
  );
}
