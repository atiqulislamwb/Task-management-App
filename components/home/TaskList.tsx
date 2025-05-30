import React from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import TaskCard from "./TaskCard";
import { Task } from "../../types/task";
import { COLORS } from "@/constants/theme";

interface TaskListProps {
  tasks: Task[];
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onEditTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoadingMore,
  onLoadMore,
  onEditTask,
}) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <TaskCard task={item} onEdit={onEditTask} index={index} />
      )}
      contentContainerStyle={styles.listContainer}
      onEndReachedThreshold={0.5}
      onEndReached={onLoadMore}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={COLORS.black}
          />
        ) : null
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    padding: 10,
  },
  loader: {
    marginVertical: 20,
  },
});

export default TaskList;
