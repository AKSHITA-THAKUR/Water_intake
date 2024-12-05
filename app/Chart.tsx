import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-gifted-charts";
import { useLocalSearchParams } from "expo-router";
interface BarData {
  value: number;
  label: string;
}

export default function Chart() {
  const [barData, setBarData] = useState<BarData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { key } = useLocalSearchParams();

  useEffect(() => {
    const loadBarData = async () => {
      try {
        // Ensure 'key' is a string
        if (typeof key !== "string") {
          console.error("Invalid key type:", key);
          setLoading(false);
          return;
        }

        const storedData = await AsyncStorage.getItem(key);  
        if (storedData) {
          setBarData(JSON.parse(storedData));
        } else {
          console.warn(`No data found for key: ${key}`);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBarData();
  }, [key]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Weekly Water Intake</Text>

      {barData ? (
        <View style={styles.chartContainer}>
          <BarChart
            spacing={30}
            maxValue={5000}
            frontColor="pink"
            noOfSections={5}
            data={barData}
            isThreeD
            barWidth={22}
            isAnimated
          />
        </View>
      ) : (
        <Text style={styles.noData}>No data available</Text>
      )}
    </ScrollView>
  );
}

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

  noKeys: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
});
