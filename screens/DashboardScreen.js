import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const DashboardScreen = ({navigation}) => {
    const [name, setName]=useState('')
  return (
    <View>
      <Text>DashboardScreen</Text>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})