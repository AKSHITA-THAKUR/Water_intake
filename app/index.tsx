import { Text, View, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BarData {
  value: number;
  label: string;
}

export default function Index() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [barData, setBarData] = useState<BarData[]>([
    { value: 0, label: "Monday" },
    { value: 0, label: "Tuesday" },
    { value: 0, label: "Wednesday" },
    { value: 0, label: "Thursday" },
    { value: 0, label: "Friday" },
    { value: 0, label: "Saturday" },
    { value: 0, label: "Sunday" },
  ]);

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem("WaterIntake");
      if (storedData) {
        setBarData(JSON.parse(storedData));
      }
    };

    loadData();
  }, []);

  const getDayIndex = () => {
    const date = new Date();
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days.indexOf(day);
  };

  const todayIndex = getDayIndex();

  const handleInputChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const handleSubmit = async () => {
    const dayIndex = getDayIndex();
    const copyData = [...barData];
    copyData[dayIndex].value += Number(amount);
    setBarData(copyData);
    await AsyncStorage.setItem("WaterIntake", JSON.stringify(copyData));
    alert(`You've consumed ${copyData[dayIndex].value} ml of water today.`);
    setAmount("");
  };

  const Today = new Date().toLocaleString("en-US", { weekday: "long" });

  return (
    <View
      style={{
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: "#f7f7f7",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          color: "#333",
        }}
      >
        Weekly Water Intake
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 15,
          textAlign: "center",
          color: "#555",
        }}
      >
        You've consumed {barData[todayIndex].value} ml of water today.
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 10, color: "#333" }}>
        Enter the water amount you took on {Today}:
      </Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <TextInput
          placeholder="Enter amount in ml"
          inputMode="numeric"
          value={amount}
          onChangeText={handleInputChange}
          style={{
            padding: 15,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 5,
            width: "70%",
            fontSize: 16,
          }}
        />
        <Pressable
          style={{
            paddingVertical: 15,
            paddingHorizontal: 25,
            backgroundColor: "#4CAF50",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => router.push("/Chart")}
        style={{
          marginTop: 20,
          backgroundColor: "#2196F3",
          padding: 15,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Show Chart</Text>
      </Pressable>
    </View>
  );
}
