import { PlusCircle } from "@phosphor-icons/react";
import { useState } from "react";

import styles from "./App.module.css";
import "./global.css";

import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { Tasks } from "./components/Tasks";

import Clipboard from "./assets/clipboard.svg";

export interface TasksProps {
  id: number;
  text: string;
  isChecked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [inputTask, setInputTask] = useState("");
  const countTasksChecked = tasks.reduce((previousValue, currentValue) => {
    if (currentValue.isChecked) {
      return previousValue + 1
    }
    return previousValue
  }, 0)

  function handleAddTask() {
    if (!inputTask) {
      return;
    }

    const newTask: TasksProps = {
      id: new Date().getTime(),
      text: inputTask,
      isChecked: false,
    };

    setTasks((state) => [...state, newTask]);
    setInputTask("");
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (!confirm("Deseja mesmo deletar essa tarefa?")) {
      return;
    }

    setTasks(filteredTasks);
  }

  function handleChangeTaskStatus({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value };
      }

      return { ...task };
    });

    setTasks(updatedTasks);
  }

  return (
    <>
      <Header />

      <div className={styles.search}>
        <Input
          onChange={(e) => setInputTask(e.target.value)}
          value={inputTask}
        />
        <Button onClick={handleAddTask}>
          Criar
          <PlusCircle size={16} weight="bold" />
        </Button>
      </div>

        <center>
        <div className={styles.home}>
          <div className={styles.createdTasks}>Tarefas criadas<span>{tasks.length}</span></div>
          <div className={styles.completedTasks}>Concluídas<span>{countTasksChecked}</span> de<span>{tasks.length}</span></div>
        </div>
        </center>
      <div className={styles.tasksList}>

        {tasks.length > 0 ? (
          <div className={styles.tasks}>
            {tasks.map((task) => (
              <Tasks
                key={task.id}
                data={task}
                removeTask={handleRemoveTask}
                changeTaskStatus={handleChangeTaskStatus}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <img src={Clipboard} alt="" />
            <p>
              <b>Você ainda não tem tarefas cadastradas</b>
            </p>
            <p>Crie tarefas e organize seusitens a fazer</p>
          </div>
        )}
      </div>
    </>
  );
}
export default App;
