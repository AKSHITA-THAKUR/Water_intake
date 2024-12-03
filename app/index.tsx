import { Text, View, TextInput, Pressable } from "react-native";
import { useState , useEffect } from "react";
import { BarChart } from "react-native-gifted-charts";

export default function Index() {
  const [amount, setAmount] = useState("");
  const [number , setNumber] = useState<number>(0);
  const [barData, setBarData] = useState([
    { value: 0, label: "Monday" },
    { value: 1000, label: "Tuesday" },
    { value: 0, label: "Wednesday" },
    { value: 0, label: "Thursday" },
    { value: 0, label: "Friday" },
    { value: 0, label: "Saturday" },
    { value: 0, label: "Sunday" },
  ]);

  useEffect(()=>{
  setNumber((prev)=> prev+1);
  } , [barData])
  const getDayIndex = () => {
    const date = new Date();
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days.indexOf(day); 
  };
   

  const handleInputChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const handleSubmit = () => {
    const dayIndex = getDayIndex();
    console.log("The day index for today is " , dayIndex);
    const copyData = [...barData];
    
    copyData[dayIndex].value += Number(amount);
    setBarData(copyData);
    alert(`You've consumed ${ barData[dayIndex].value} ml of water today.`);
    setAmount("");
  };
  console.log(barData)

  const Today = new Date().toLocaleString("en-US", { weekday: "long" });
  return (
    <View
      style={{
        flex: 1,
        marginTop: 15,
        alignItems: "center",
      }}
    >
      <Text >
        Weekly water Intake {barData[1].value}
      </Text>

      <Text style={{ padding: 10 }}>
        Enter the water amount you take on {Today}
      </Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TextInput
          placeholder="Enter amount in ml"
          inputMode="numeric"
          value={amount}
          onChangeText={handleInputChange}
          style={{ padding: 15, borderColor: "black" }}
        />
        <Pressable
          style={{ padding: 8, backgroundColor: "green", borderRadius: 5 }}
          onPress={handleSubmit}
        >
          <Text  className="text-2xl text-white">Submit</Text>
        </Pressable>
       
      </View>
        <BarChart spacing={30} maxValue={5000} frontColor="pink" noOfSections={5} data={barData} barWidth={22}  /> 
    </View>
  );
}
