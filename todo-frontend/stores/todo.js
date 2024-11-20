/* eslint-disable no-async-promise-executor */
import { defineStore } from 'pinia'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    error: null
  }),
  actions: {
    fetchTodos (userId) {
      return new Promise(async (resolve, reject) => {
        try {
          const querySnapshot = await getDocs(collection(db, 'users', userId, 'todos'))

          if (querySnapshot.empty) {
            this.todos = []
          } else {
            this.todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          }
          resolve()
        } catch (error) {
          reject(error)
          console.error('Error fetching todos:', error)
          this.todos = []
        }
      })
    },
    async addTodo (userId, subject, description) {
      try {
        const activitiesNo = `AC-${String(Date.now()).slice(-4)}`

        await addDoc(collection(db, 'users', userId, 'todos'), {
          activitiesNo,
          subject,
          description,
          status: ''
        })
      } catch (error) {
        console.error('Error adding todo:', error)
        this.error = error.message
      }
    },
    updateTodoDetails (userId, todoId, payload, statusValue) {
      return new Promise(async (resolve, reject) => {
        try {
          const todoRef = doc(db, 'users', userId, 'todos', todoId)
          await updateDoc(todoRef, { ...payload, status: payload.status !== statusValue ? statusValue : '' })

          resolve()
        } catch (error) {
          console.error('Error updating to-do details:', error)
          this.error = error.message
          reject(error)
        }
      })
    },
    deleteTodo (userId, todoId) {
      return new Promise(async (resolve, reject) => {
        try {
          await deleteDoc(doc(db, 'users', userId, 'todos', todoId))
          resolve()
        } catch (error) {
          console.error('Error deleting todo:', error)
          this.error = error.message
          reject(error)
        }
      })
    }
  }
})
