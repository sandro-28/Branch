# 4. Data Models (Meta-Layer)

These models are used by the Console to manage the infrastructure. They are stored in a local SQLite database (via Prisma/Better-SQLite) within the Console application for the MVP.

### 4.1 Project Model
**Purpose:** Represents a deployed database instance.
**Key Attributes:**
- `id`: UUID - Unique identifier
- `name`: string - Display name
- `status`: enum - 'provisioning' | 'online' | 'offline' | 'error'
- `port_mapping`: integer - Internal port assigned on the host
- `created_at`: timestamp - Creation date
- `db_password_hash`: string - Encrypted storage of the DB password (if managed)

### 4.2 Console User Model
**Purpose:** The administrator of the VPS accessing the console.
**Key Attributes:**
- `id`: UUID
- `email`: string
- `password_hash`: string
- `last_login`: timestamp

### 4.3 Relationships
- **Console User** has many **Projects**.
