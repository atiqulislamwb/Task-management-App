import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TaskStatus = "all" | "completed" | "incomplete";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO string
  completed: boolean;
}

interface TaskState {
  allTasks: Task[];
  filter: {
    page: number;
    pageSize: number;
    title: string;
    status: TaskStatus;
    startDate?: string | null;
    endDate?: string | null;
  };

  hasMore: boolean;
  filteredHasMore: boolean;
  filteredTasksCount: number;
}

const mockTasks: Task[] = Array.from({ length: 20 }, (_, i) => ({
  id: `task-${i + 1}`,
  title: `Mock Task ${i + 1}`,
  description: `Description for task ${i + 1}`,
  dueDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
  completed: i % 2 === 0,
}));

const initialState: TaskState = {
  allTasks: mockTasks,
  filter: {
    page: 1,
    pageSize: 10,
    title: "",
    status: "all",
    startDate: null,
    endDate: null,
  },
  hasMore: true,
  filteredHasMore: true,
  filteredTasksCount: 0,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...action.payload,
        completed: false,
      };
      state.allTasks.unshift(newTask);
      // Reset pagination when adding new task
      state.filter.page = 1;
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.allTasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.allTasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.allTasks = state.allTasks.filter((t) => t.id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const task = state.allTasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setFilter: (state, action: PayloadAction<Partial<TaskState["filter"]>>) => {
      state.filter = { ...state.filter, ...action.payload, page: 1 }; // Reset to page 1 when filter changes
    },
    nextPage: (state) => {
      state.filter.page += 1;
    },
    resetPage: (state) => {
      state.filter.page = 1;
    },
    clearFilter: (state) => {
      state.filter = initialState.filter;
    },
    // New reducer to update pagination flags
    updatePaginationFlags: (state) => {
      const { page, pageSize } = state.filter;
      const isFilterActive =
        state.filter.title !== "" ||
        state.filter.status !== "all" ||
        state.filter.startDate ||
        state.filter.endDate;

      if (isFilterActive) {
        const filtered = applyFilters(state.allTasks, state.filter);
        state.filteredTasksCount = filtered.length;
        state.filteredHasMore = filtered.length > page * pageSize;
      } else {
        state.hasMore = state.allTasks.length > page * pageSize;
      }
    },
  },
});

// Helper function to apply filters (used in selector and reducer)
const applyFilters = (tasks: Task[], filter: TaskState["filter"]) => {
  let filtered = [...tasks];

  // Filter by title (search)
  if (filter.title) {
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(filter.title.toLowerCase())
    );
  }

  // Filter by status
  if (filter.status === "completed") {
    filtered = filtered.filter((task) => task.completed);
  } else if (filter.status === "incomplete") {
    filtered = filtered.filter((task) => !task.completed);
  }

  // Filter by due date range
  if (filter.startDate) {
    filtered = filtered.filter(
      (task) => new Date(task.dueDate) >= new Date(filter.startDate!)
    );
  }
  if (filter.endDate) {
    filtered = filtered.filter(
      (task) => new Date(task.dueDate) <= new Date(filter.endDate!)
    );
  }

  return filtered;
};

// Selector with memoized filtered tasks
export const selectVisibleTasks = createSelector(
  (state: RootState) => state.tasks.allTasks,
  (state: RootState) => state.tasks.filter,
  (allTasks, filter) => {
    const filtered = applyFilters(allTasks, filter);
    const start = 0;
    const end = filter.page * filter.pageSize;
    return filtered.slice(start, end);
  }
);

// Selector to check if filter is active
export const selectIsFilterActive = createSelector(
  (state: RootState) => state.tasks.filter,
  (filter) => {
    return (
      filter.title !== "" ||
      filter.status !== "all" ||
      filter.startDate ||
      filter.endDate
    );
  }
);

// Selector for total filtered tasks count
export const selectFilteredTasksCount = (state: RootState) =>
  state.tasks.filteredTasksCount;

// Selector for hasMore state (considers filters)
export const selectHasMore = createSelector(
  (state: RootState) => state.tasks,
  (state: RootState) => selectIsFilterActive(state),
  (tasks, isFilterActive) => {
    return isFilterActive ? tasks.filteredHasMore : tasks.hasMore;
  }
);

export const {
  addTask,
  editTask,
  deleteTask,
  toggleCompleted,
  setFilter,
  nextPage,
  resetPage,
  clearFilter,
  updatePaginationFlags,
} = tasksSlice.actions;

export default tasksSlice.reducer;
