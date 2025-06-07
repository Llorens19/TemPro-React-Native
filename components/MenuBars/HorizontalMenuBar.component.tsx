import { Icon } from '@/components/Icons/Icon.component';
import React, { JSX } from 'react';
import { View, Pressable } from 'react-native';

export const HorizontalMenuBar = (): JSX.Element => {
  return (
    <View className="w-full flex-row py-4 justify-between">
      <Pressable className="flex-1 items-center">
        <Icon name={'crono'}/>
      </Pressable>
      <Pressable className="flex-1 items-center">
        <Icon name={'crono'}/>
      </Pressable>
      <Pressable className="flex-1 items-center">
        <Icon name={'crono'}/>
      </Pressable>
      <Pressable className="flex-1 items-center">
        <Icon name={'crono'}/>
      </Pressable>
    </View>

  );
};
