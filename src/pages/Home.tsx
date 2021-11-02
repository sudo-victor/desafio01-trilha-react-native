import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyExists = tasks.find((task) => task.title === newTaskTitle);
    if (alreadyExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === id) {
          task = {
            ...task,
            done: !task.done,
          };
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldState) => oldState.filter((task) => task.id !== id)),
        },
      ],
      { cancelable: false }
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks((oldState) =>
      oldState.map((task) => {
        if (task.id === taskId) {
          task = {
            ...task,
            title: taskNewTitle,
          };
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
