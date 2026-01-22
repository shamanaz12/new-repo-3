'use client';

// Local Auth - No backend required
// Stores user session in localStorage

const AUTH_KEY = 'taskflow_auth_user';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Get current user from localStorage
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

// Save user to localStorage
export const saveUser = (user: User) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

// Remove user from localStorage
export const removeUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
};

// Generate random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Local Sign Up
export const localSignUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: User }> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const usersKey = 'taskflow_users';
  const existingUsers = JSON.parse(localStorage.getItem(usersKey) || '[]');

  if (existingUsers.find((u: any) => u.email === email)) {
    return { success: false, error: 'User already exists with this email' };
  }

  const newUser = {
    id: generateId(),
    email,
    name,
    password,
    createdAt: new Date().toISOString(),
  };

  existingUsers.push(newUser);
  localStorage.setItem(usersKey, JSON.stringify(existingUsers));

  const { password: _, ...userWithoutPassword } = newUser;
  saveUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
};

// Local Sign In
export const localSignIn = async (email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const usersKey = 'taskflow_users';
  const existingUsers = JSON.parse(localStorage.getItem(usersKey) || '[]');

  const user = existingUsers.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  const { password: _, ...userWithoutPassword } = user;
  saveUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
};

// Local Sign Out
export const localSignOut = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  removeUser();
};

// Check if authenticated
export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};
