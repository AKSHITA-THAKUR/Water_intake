import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Router, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";

const previousData = () => {
  const [weekKeys, setWeekKeys] = useState<string[]>([]);
  const router = useRouter();
  const fetchWeekKeys = async () => {  // FETCH ALL THE KEYS WHICH STARTS WITH WEEK
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const filteredKeys = allKeys.filter((key) => key.startsWith("Week"));
      setWeekKeys(filteredKeys);
    } catch (error) {
      console.error("Error fetching week keys:", error);
    }
  };

  useEffect(() => {
    fetchWeekKeys();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Previous Weeks data</Text>
      {weekKeys.length > 0 ? (
        weekKeys.map((key) => {
          // Skip rendering a Pressable if the key is "WeekReset"
          if (key === "WeekReset") {
            return null;
          }
          return (
            <Button
              key={key}
              title={key}
              onButtonPress={() => router.navigate(`/Chart?key=${key}`)}
            />
          );
        })
      ) : (
        <Text style={styles.noKeys}>No previous weeks found</Text>
      )}
    </View>
  );
};
export default previousData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  noData: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    alignItems: "center",
    color: "#444",
  },
  pressable: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  pressableText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noKeys: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
});
