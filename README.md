# Cloud-Based-File-Vault

## 📌 Project Overview

The **Cloud-Based File Vault** is a web application designed to help users upload, store, view, download, and delete files through a simple web interface.

The project contains a **frontend** and **backend**. The frontend provides the user interface, while the backend provides REST APIs for file management.

The project can later be connected to cloud storage services such as AWS S3, Google Cloud Storage, or Azure Blob Storage.

---

## 🎯 Objectives

* Provide a simple online file storage system.
* Allow users to upload files.
* Display uploaded files.
* Allow users to download files.
* Allow users to delete files.
* Provide REST APIs for file management.
* Create a foundation for a secure cloud storage application.

---


## 📂 Project Structure

```text
Cloud-Based-File-Vault/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── uploads/
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

---



# 🔄 System Workflow

```text
                 USER
                   │
                   ↓
          FRONTEND WEBSITE
            HTML + CSS + JS
                   │
                   ↓
              REST API
                   │
                   ↓
          NODE.JS + EXPRESS
                   │
                   ↓
             MULTER
                   │
                   ↓
              UPLOADS
              FOLDER
             /       \
            ↓         ↓
        Download    Delete
```

---

# ☁️ Cloud Architecture

The project can be converted into a complete cloud-based application.

```text
              USER
                │
                ↓
        CLOUD FRONTEND
                │
                ↓
          REST API
                │
                ↓
       CLOUD BACKEND
                │
                ↓
       CLOUD FILE STORAGE
                │
                ↓
          FILE DATABASE
```

---

This project is created for educational and academic purposes.
