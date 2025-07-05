import React, { useState, useRef, useEffect } from 'react';
import Input from './components/Input.jsx';
import { MdOutlineRestartAlt } from 'react-icons/md';

export default function App() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [limit, setLimit] = useState(() => {
    const saved = localStorage.getItem('limit');
    return saved ? parseFloat(saved) : 0;
  });

  const limitRef = useRef();

  // Save expenses to localStorage on change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Save limit to localStorage on change
  useEffect(() => {
    localStorage.setItem('limit', limit);
  }, [limit]);

  function handleLimit() {
    const value = parseFloat(limitRef.current.value);
     
    if (!isNaN(value)) {
      setLimit(value);
    }

    limitRef.current.value = '';
  }

  function handleReset() {
    setLimit('');
  }

  

  function addExpense() {
    if (!title || !amount) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        title,
        amount: parseFloat(amount),
      }
    ]);
    setTitle('');
    setAmount('');
  }

  function deleteExpenses(id) {
    setExpenses(expenses.filter(exp => exp.id !== id));
  }

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className='container'>
      <h1>Expenses Tracker</h1>
      <img src='./src/assets/Logo.png ' />
      <div className="input-group">
        <Input
          type="text"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          type="number"
          label="Amount"
          value={amount}
          onChange={i => setAmount(i.target.value)}
        />
        <button onClick={addExpense} disabled={!title || !amount} className="button primary">
          Add expense
        </button>
      </div>

      <div className='expenses-list'>
        {expenses.length === 0 ? (
          <p className="no-expenses">No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map(exp => (
              <li key={exp.id}>
                <span>{exp.title}</span>
                <span className="expense-amount">${exp.amount.toFixed(2)}</span>
                <button onClick={() => deleteExpenses(exp.id)} className="button icon-button">X</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='summary'>
        <h2>Total Expenses</h2>
        <p className="total-amount">{total.toFixed(2)}$</p>
      </div>

      <div className="limit-section">

      <button onClick={handleReset} disabled={limit === 0} className="button icon-only-button reset-button">
          <MdOutlineRestartAlt size={20} /> {/* Adjust size as needed */}
          <span className="sr-only">Reset Limit</span> {/* For screen readers */}
      </button>
        <Input
          type="number"
          label="Set Limit"
          ref={limitRef}
          className="input-limit"
        />
        <button onClick={handleLimit} className="button secondary">Set Limit</button>
        <p className="current-limit">
          {limit !== 0 ? `Your limit is $${Number(limit).toFixed(2)}` : "No limit set"}
        </p>
      </div>
      {limit > 0 && total > limit && (
        <p className="limit-exceeded">🚨 You exceeded the limit!</p>
      )}
    </div>
  );
}
