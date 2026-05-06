<!--  EMP O W E R - Animated README  -->
<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=28&duration=3500&color=3B82F6&center=true&vCenter=true&width=650&lines=✨+WELCOME+TO+EMPOWER+✨;A+Modern+Employee+Management+System;React+%2B+Tailwind+%2B+SpringBoot+%2B+MySQL;Fast.+Secure.+Responsive." />
</p>

<h1 align="center">🚀 EMP O W E R — Employee Management System</h1>

<div align="center"> 

[![Frontend - React](https://img.shields.io/badge/Frontend-Vite%20React-FFD700?style=for-the-badge&logo=react&logoColor=black)]()
[![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)]()
[![SpringBoot](https://img.shields.io/badge/Backend-SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)]()
[![MySQL](https://img.shields.io/badge/Database-MySQL-00618A?style=for-the-badge&logo=mysql&logoColor=white)]()
![API](https://img.shields.io/badge/API-JPA%20REST-orange?style=for-the-badge)

</div>

---

# 🔴 **LIVE DEMO**

<p align="center">
  <a href="https://empower-demo.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀 LIVE DEMO Available-3B82F6?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>

<p align="center">
  <i>Click above to explore the live, fully responsive EMP O W E R demo!</i>
</p>

---

# 🌟 Overview

**Empower** is a sleek, animated, and scalable **Employee Management System** featuring:  
✨ Role-based login  
✨ Admin & Employee dashboards  
✨ Project + Finance modules  
✨ Strong validation rules  
✨ PDF Payslip downloads  
✨ MySQL-backed Spring Boot REST API  
✨ Fast Vite + React + Tailwind UI  

---

# ⚡ Tech Stack

## 🎨 Frontend
- Vite  
- React  
- Tailwind CSS  
- Axios  
- React Router  

## 🛠 Backend
- Spring Boot  
- Spring Data JPA  
- REST API  
- MySQL  
- (Optional: JWT Authentication)

---

# 🔐 Role-Based Login

Users can log in using **Employment Code / Company Email + Password**.  
Backend validates and redirects based on role:

### 🛡️ **Admin Dashboard**  
### 👩‍💼 **Employee Dashboard**

---

# 🛡️ Admin Dashboard (Super User)

### Admin Can:
✔ Add employee  
✔ Update employee (with restrictions)  
✔ Delete employee  
✔ View employee table  
✔ Use action icons → View | Edit | Delete  

### Employee Table Fields:
- Employment Code  
- Name  
- Company Email  
- Manager Name  
- Current Project  
- Actions  

---

# 👨‍💼 Employee Dashboard

Employees can only **view** their data:  
- Personal Details  
- Professional Details  
- Project Details  
- Finance  

📄 **Can download last 6 months’ payslips (PDF)**  
❌ Cannot edit any fields  

---

# 🗂 Employee Record Structure

## 🧍 Personal Details (Mandatory)

Fields include name, DOB, gender, addresses, mobile, email, emergency contact, etc.  

### Validations:
- Employment Code → 6 digits  
- Mobile → 10 digits  
- Pin Code → 6 digits  
- Age → 1–3 digits  
- Email → valid format  

### ❌ Admin Cannot Edit:
- Employment Code  
- Gender  
- Date of Birth  

---

## 🏢 Professional Details (Mandatory)

Includes company mail, office phone, manager, HR, joining date, history, etc.

### ❌ Admin Cannot Edit:
- Employment Code  
- Company Mail  
- Date of Joining  

---

## 💼 Project Details (Optional)

Supports:  
✔ Current project  
✔ Past projects  

Fields: Project code, name, dates, manager email/code.

---

## 💰 Finance (Mandatory)

Includes PAN, Aadhar, bank info, IFSC, CTC breakdown.

📄 Employees can download **six months’ payslips (PDF)**  
❌ Admin cannot download payslips  

---

# 🎨 UI / UX Features

✨ Tailwind CSS animations  
✨ Smooth transitions  
✨ Modern card UI  
✨ Fully responsive  
✨ Fast Vite HMR  
✨ Clean layouts  

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?size=22&duration=3000&color=38BDF8&center=true&width=500&lines=Fast+UI.;Smooth+Transitions.;Beautiful+Design.;Fully+Responsive.;" />
</p>

---

# ⚙️ Installation & Setup

## 🟦 Frontend Setup (Vite + React)

```bash
cd frontend
npm install
npm run dev
