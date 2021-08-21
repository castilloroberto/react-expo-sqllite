import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Item, ItemsProps } from '../models/Models';




function openDB() {
    if(Platform.OS === "web"){
        return {
          transaction:()=>{
            return {
              executeSql:()=>{}
            }
          }
        }
    }
    const db  = SQLite.openDatabase("todoList.db")
    return db

}

export const db = openDB()


export function Items({done:doneHeading,onPressItem}:ItemsProps) {

    const [items, setItems] = useState<Item[]>([])  
    
    useEffect(() => {

      db.transaction((tx)=>{
        tx.executeSql(
          `select * from items where done = ?;`,
          [doneHeading ? 1 : 0],
          (_,{rows}) => {
            setItems(Array.from(rows as any) as Item[])
          }
        )

      })
      
    }, [])

    const heading = doneHeading ? "Completado" : "Por hacer"

    if(items === null || items.length === 0){
      return null
    }

    return (
      <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
    )



}

const styles = StyleSheet.create({
  
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});