import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/Pen.png'
import { EditTaskArgs } from '../pages/Home'
import { Task } from './TasksList'

interface TaskItemProps {
  task: Task
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void
}

export function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone
}: TaskItemProps) {
  const [taskEditing, setTaskEditing] = useState(false)
  const [saveTaskEdit, setSaveTaskEdit] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setTaskEditing(true)
  }

  function handleCancelEditing() {
    setSaveTaskEdit(task.title)
    setTaskEditing(false)
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: saveTaskEdit })
    setTaskEditing(false)
  }
  useEffect(() => {
    if (textInputRef.current) {
      if (taskEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [taskEditing])

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={
              task.done === true ? styles.taskMarkerDone : styles.taskMarker
            }
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={task.done === true ? styles.taskTextDone : styles.taskText}
            value={saveTaskEdit}
            onChangeText={setSaveTaskEdit}
            editable={taskEditing}
            ref={textInputRef}
            onSubmitEditing={handleSubmitEditing}
            selectTextOnFocus
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {taskEditing ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
        )}
        <View
          style={{
            height: 24,
            width: 1,
            backgroundColor: 'rgba(196, 196, 196, 0.24)'
          }}
        />

        <TouchableOpacity
          style={
            taskEditing
              ? { opacity: 0.2, paddingHorizontal: 24 }
              : { opacity: 1, paddingHorizontal: 24 }
          }
          onPress={() => removeTask(task.id)}
          disabled={taskEditing ? true : false}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})
