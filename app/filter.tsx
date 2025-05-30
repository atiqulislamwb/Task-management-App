import AppScreen from "@/components/common/AppScreen";
import FilterActions from "@/components/filter/FilterActions";
import FilterDatePicker from "@/components/filter/FilterDatePicker";
import FilterHeader from "@/components/filter/FilterHeader";
import FilterInput from "@/components/filter/FilterInput";
import FilterStatusPicker from "@/components/filter/FilterStatusPicker";
import { clearFilter, setFilter } from "@/redux/feature/task/tasksSlice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const [title, setTitle] = useState(filter.title);
  const [status, setStatus] = useState(filter.status);
  const [startDate, setStartDate] = useState<Date | null | any>(
    filter?.startDate
  );
  const [endDate, setEndDate] = useState<Date | null | any>(filter?.endDate);

  const applyFilter = () => {
    dispatch(
      setFilter({
        title,
        status,
        startDate: startDate?.toISOString() || null,
        endDate: endDate?.toISOString() || null,
        page: 1,
      })
    );
    router.push({
      pathname: "/home",
    });
  };

  const clearAll = () => {
    setTitle("");
    setStatus("all");
    setStartDate(null);
    setEndDate(null);
    dispatch(clearFilter());
  };

  return (
    <AppScreen>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <FilterHeader />

        <FilterInput
          label="Title"
          placeholder="Search by title..."
          value={title}
          onChangeText={setTitle}
        />

        <FilterStatusPicker status={status} setStatus={setStatus} />

        <View style={styles.dateRow}>
          <FilterDatePicker
            label="Start Date"
            date={startDate}
            setDate={setStartDate}
          />
          <FilterDatePicker
            label="End Date"
            date={endDate}
            setDate={setEndDate}
          />
        </View>

        <FilterActions onClear={clearAll} onApply={applyFilter} />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default Filter;
