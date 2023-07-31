import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export type EditTaskArgs = {
  taskId: number
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }
    const updatedTasks = tasks.map(task => ({ ...task }))
    const checkTask = updatedTasks.find(item => item.title === newTaskTitle)

    if (!checkTask) {
      setTasks(oldState => [...oldState, data])
    } else {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome!')
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const toggleTask = updatedTasks.find(item => item.id === id)

    if (!toggleTask) return

    toggleTask.done = !toggleTask.done
    setTasks(updatedTasks)
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const editTask = updatedTasks.find(item => item.id === taskId)

    if (!editTask) return

    editTask.title = taskNewTitle

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Sim, remover',
          onPress: () =>
            setTasks(oldState => oldState.filter(task => task.id !== id))
        },
        {
          text: 'Cancelar'
        }
      ]
    )
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
