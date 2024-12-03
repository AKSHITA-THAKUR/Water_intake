import { View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-gifted-charts";

interface BarData {
  value: number;
  label: string;
}

export default function Chart() {
  const [barData, setBarData] = useState<BarData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBarData = async () => {
      const storedData = await AsyncStorage.getItem("WaterIntake");
      if (storedData) {
        setBarData(JSON.parse(storedData));
      }
      setLoading(false);
    };

    loadBarData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Weekly Water Intake
      </Text>
      {barData ? (
        <BarChart
          spacing={30}
          maxValue={5000}
          frontColor="pink"
          noOfSections={5}
          data={barData}
          isThreeD
          barWidth={22}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}
