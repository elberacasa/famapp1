import React, { useState } from 'react';

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

const GoalsTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ name: '', targetAmount: 0 });

  const addGoal = () => {
    setGoals([...goals, { ...newGoal, id: Date.now(), currentAmount: 0 }]);
    setNewGoal({ name: '', targetAmount: 0 });
  };

  const updateGoalProgress = (id: number, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, currentAmount: goal.currentAmount + amount } : goal
    ));
  };

  return (
    <div className="goals-tracker">
      <h2>Financial Goals</h2>
      {goals.map(goal => (
        <div key={goal.id} className="goal-item">
          <h3>{goal.name}</h3>
          <p>Target: ${goal.targetAmount}</p>
          <p>Progress: ${goal.currentAmount} / ${goal.targetAmount}</p>
          <progress value={goal.currentAmount} max={goal.targetAmount} />
          <input
            type="number"
            placeholder="Add progress"
            onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
          />
        </div>
      ))}
      <div className="new-goal-form">
        <input
          type="text"
          placeholder="Goal name"
          value={newGoal.name}
          onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Target amount"
          value={newGoal.targetAmount}
          onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
        />
        <button onClick={addGoal}>Add Goal</button>
      </div>
    </div>
  );
};

export default GoalsTracker;