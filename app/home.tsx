import { StyleSheet, View } from "react-native";

import { useClerk } from "@clerk/clerk-expo";

import { logout } from "@/redux/feature/auth/authSlice";
import { AppDispatch, RootState } from "../redux/store";

import { useCallback, useEffect } from "react";

import AppScreen from "@/components/common/AppScreen";
import {
  clearFilter,
  nextPage,
  selectHasMore,
  selectIsFilterActive,
  selectVisibleTasks,
  setFilter,
  updatePaginationFlags,
} from "@/redux/feature/task/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

import ClearFilterButton from "@/components/home/ClearFilterButton";
import TaskHeader from "@/components/home/TaskHeader";
import TaskList from "@/components/home/TaskList";
import { useRouter } from "expo-router";

const Home = () => {
  const { signOut } = useClerk();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const tasks = useSelector(selectVisibleTasks);
  const isLoadingMore = useSelector(selectHasMore);
  const isFilterActive = useSelector(selectIsFilterActive);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore) {
      dispatch(nextPage());
      dispatch(updatePaginationFlags());
    }
  }, [dispatch, isLoadingMore]);

  const handleSignOut = async () => {
    try {
      await signOut();
      dispatch(logout());
      router.replace("/auth");
    } catch (err) {
      console.log("Sign out error:", err);
    }
  };

  const handleClearFilter = () => {
    dispatch(clearFilter());
    dispatch(updatePaginationFlags());
  };

  const handleEditTask = (id: string) => {
    router.push({
      pathname: "/addedit",
      params: { id },
    });
  };

  useEffect(() => {
    dispatch(setFilter({ ...filter, page: 1 }));
    dispatch(updatePaginationFlags());
  }, []);
  return (
    <AppScreen>
      <View style={styles.mainContainer}>
        <TaskHeader
          onAddTask={() => router.push("/addedit")}
          onFilter={() => router.push("/filter")}
        />

        {isFilterActive && <ClearFilterButton onPress={handleClearFilter} />}

        <TaskList
          tasks={tasks}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          onEditTask={handleEditTask}
        />
      </View>
    </AppScreen>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
