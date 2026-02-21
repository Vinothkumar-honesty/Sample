# MediFlow AI – API Endpoints

Base URL: `http://localhost:8000/api`  
Auth: `Authorization: Bearer <access_token>`

---

## Auth (`/api/auth/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/login/`        | JWT login (username, password) → access, refresh, user |
| POST   | `/api/auth/token/refresh/` | Refresh access token (refresh) |
| POST   | `/api/auth/register/`     | Register (username, email, password, first_name, last_name, role, phone) |
| GET    | `/api/auth/profile/`      | Current user profile |
| PATCH  | `/api/auth/profile/`      | Update profile |

---

## Triage (`/api/triage/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/triage/`     | List triage submissions (patient: own; admin/doctor: all) |
| POST   | `/api/triage/`     | Submit symptoms (symptoms[], notes) → urgency LOW/MEDIUM/HIGH, score |
| GET    | `/api/triage/{id}/`| Detail |

---

## Hospital (`/api/hospital/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/hospital/hospitals/`      | List hospitals (with bed_summary or full beds) |
| GET    | `/api/hospital/hospitals/{id}/` | Hospital detail + beds + doctors |
| GET    | `/api/hospital/beds/`          | List all beds (real-time availability) |
| GET    | `/api/hospital/doctors/`       | List doctors |

---

## Appointments (`/api/appointments/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/appointments/`      | List appointments |
| POST   | `/api/appointments/`      | Book (hospital, doctor?, scheduled_at, notes?) |
| GET    | `/api/appointments/{id}/` | Detail (includes queue_position) |
| POST   | `/api/appointments/{id}/cancel/` | Cancel appointment |
| DELETE | `/api/appointments/{id}/` | Cancel (soft) |

---

## Prediction (`/api/prediction/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/prediction/surge/?days_ahead=1` | Surge prediction percentage (1–14 days) |

---

## Records (`/api/records/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/records/`      | List medical reports (patient: own; admin/doctor: all) |
| POST   | `/api/records/`      | Upload report (title, file?, notes?) multipart |
| GET    | `/api/records/{id}/` | Report detail |
