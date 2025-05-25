# 💰 Personal Finance Visualizer

A beautiful and intuitive personal finance dashboard that helps you track your transactions, view spending summaries, and set category-specific budgets — all in a clean, responsive interface.

🔗 **Live Demo:**[personal-finance-visualizer.vercel.app](https://personal-finance-visualizer-sandy.vercel.app/)

---

## 🧠 Overview

This app allows users to:

- ✅ Add & delete transactions
- 📆 View weekly and monthly spending summaries
- 🗂 Categorize expenses (e.g., Food, Rent, Utilities)
- 📊 Visualize category-wise spending with budgets
- 🔄 Interact with smooth, dynamic charts

---

## ⚙️ Technologies Used

| Category         | Stack                            |
|------------------|----------------------------------|
| Framework        | [Next.js 15](https://nextjs.org) |
| Language         | TypeScript                       |
| UI Components    | [shadcn/ui](https://ui.shadcn.com) |
| Charts           | [Recharts](https://recharts.org) |
| Date Utilities   | [date-fns](https://date-fns.org) |
| Styling          | Tailwind CSS                     |

---

## 📁 Project Structure

finance-visualizer/<br>
│<br>
├── app/<br>
│   └── page.tsx             # Main app logic & UI<br>
│<br>
├── components/<br>
│   └── ui/                  # UI components from shadcn/ui (Button, Card, Input, etc.)<br>
│<br>
├── public/                  # Static assets<br>
│<br>
├── tailwind.config.js       # Tailwind styling config<br>
├── tsconfig.json            # TypeScript configuration<br>
└── package.json             # NPM dependencies and scripts<br>

---

## ✨ Features In Detail

### ➕ Add Transactions
Enter an amount, date, description, and category to record an expense. Clean error handling ensures all fields are filled.

### 🧾 View Transactions
Every transaction is shown with an option to delete. Displayed with category, date, and amount.

---

## 📈 Charts & Insights

#### 📆 Weekly and Monthly Charts
Weekly: Summarizes all transactions within 7-day windows

Monthly: Shows overall spend per month

Interactive bar charts powered by Recharts

#### 📊 Budget by Category
Set individual budgets for each category (e.g., ₹5000 for Rent)

Visual progress bars indicate how much you've spent vs. set budget

Color-coded:

   ✅ Green: Within budget

   ❌ Red: Exceeded budget

---

## 🧱 UI Components Used

| Component  | Description                       |
| ---------- | --------------------------------- |
| `Card`     | For section containers            |
| `Input`    | For user text/number/date entry   |
| `Button`   | For interactions like Add/Delete  |
| `Select`   | For choosing transaction category |
| `Progress` | For budget status visualization   |

---

### 📄 License
MIT License © VikasSingh30
