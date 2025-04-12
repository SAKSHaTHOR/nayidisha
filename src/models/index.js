/**
 * @typedef {Object} Goal
 * @property {string} id - Firestore document ID
 * @property {string} userId - User ID who owns this goal
 * @property {string} name - Goal name
 * @property {number} targetAmount - Target amount to save
 * @property {Date} targetDate - Target date to achieve the goal
 * @property {number} currentAmount - Current amount saved
 * @property {Date} createdAt - Goal creation date
 */

/**
 * @typedef {'income' | 'expense'} TransactionType
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id - Firestore document ID
 * @property {string} userId - User ID who owns this transaction
 * @property {TransactionType} type - Transaction type (income/expense)
 * @property {string} category - Transaction category
 * @property {string} [description] - Optional transaction description
 * @property {number} amount - Transaction amount
 * @property {Date} date - Transaction date
 * @property {Date} createdAt - Transaction creation date
 */

/**
 * @typedef {Object} User
 * @property {string} id - User's Firebase Auth UID
 * @property {string} email - User's email address
 * @property {string} [displayName] - User's display name
 * @property {string} [photoURL] - User's profile photo URL
 * @property {Date} createdAt - Account creation date
 */

// Transaction Categories
export const INCOME_CATEGORIES = [
  'Salary',
  'Business',
  'Investments',
  'Freelance',
  'Other Income'
];

export const EXPENSE_CATEGORIES = [
  'Housing',
  'Transportation',
  'Food',
  'Utilities',
  'Healthcare',
  'Education',
  'Shopping',
  'Entertainment',
  'Savings',
  'Other Expenses'
]; 