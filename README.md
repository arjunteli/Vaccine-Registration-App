# Vaccine Registration System - Backend API Documentation

This is the backend API for a vaccine registration system, which allows users to register for vaccines, view available slots, and manage their registrations. The system includes both user and admin functionalities.

## User Schema

- **name**: User's full name (string)
- **phone**: User's phone number (string)
- **age**: User's age (integer)
- **pincode**: User's residential pincode (string)
- **aadhar**: User's Aadhar number (string)
- **password**: User's password (string)
- **token**: JWT token for authentication (string)

## Registration Schema

- **user**: User ID (foreign key to the User schema)
- **username**: User's name (string)
- **age**: User's age (integer)
- **pincode**: User's residential pincode (string)
- **phone**: User's phone number (string)
- **stateofDosage**: First or second dose status (string)
- **slotDate**: Date of vaccination (string, format: "dd-mm-yyyy")
- **slotTime**: Time of vaccination (string, format: "hh.mmAM-hh.mmPM")

## Admin Schema

- **phone**: Admin's phone number (string)
- **password**: Admin's password (string)
- **token**: JWT token for admin authentication (string)

## API Endpoints

### User APIs

#### 1. **POST /signup**
- **Functionality**: Allows a new user to sign up.
- **Request Body**:
  - `name` (string): User's full name
  - `phone` (string): User's phone number
  - `age` (integer): User's age
  - `pincode` (string): User's pincode
  - `aadhar` (string): User's Aadhar number
  - `password` (string): User's password
- **Response**: A success or error message indicating the result of the signup.

#### 2. **POST /login**
- **Functionality**: Allows an existing user to log in.
  - On successful login, the system generates and updates a JWT token.
- **Request Body**:
  - `phone` (string): User's phone number
  - `password` (string): User's password
- **Response**: A success message with a token on successful login.

#### 3. **POST /logout**
- **Functionality**: Logs the user out and deletes the authentication token.
- **Request Body**: None
- **Response**: A success or error message indicating the result of the logout.

#### 4. **GET /user/dates**
- **Functionality**: Retrieves a list of 30 available dates for vaccination.
- **Request Parameters**: None
- **Response**: A list of available dates with slot availability.

#### 5. **GET /user/dates/slots**
- **Functionality**: Retrieves available vaccination slots for a given date.
- **Request Body**:
  - `slotDate` (string): The date to check for available slots (format: "dd-mm-yyyy")
- **Response**: A list of available slots for the given date with availability status.

#### 6. **POST /user/dates/slots/slotRegistration**
- **Functionality**: Registers the user for a vaccination slot (either first or second dose).
- **Request Body**:
  - `username` (string): User's name
  - `age` (integer): User's age
  - `pincode` (string): User's pincode
  - `phone` (string): User's phone number
  - `slotDate` (string): Date of vaccination (format: "dd-mm-yyyy")
  - `slotTime` (string): Time of vaccination (format: "hh.mmAM-hh.mmPM")
- **Query Params**:
  - `dose` (integer): Dose type (1 for first dose, 2 for second dose)
- **Response**: A success message with registration details.

#### 7. **GET /user/getRegistrationDetails**
- **Functionality**: Retrieves the details of the user's vaccination registration.
- **Request Parameters**: None
- **Response**: A success message with the user's registration details.

#### 8. **PUT /user/updateRegistration**
- **Functionality**: Allows the user to update their vaccination slot (if it’s more than 24 hours before the scheduled time).
- **Request Body**:
  - `slotDate` (string): New date for vaccination (format: "dd-mm-yyyy")
  - `slotTime` (string): New time for vaccination (format: "hh.mmAM-hh.mmPM")
- **Response**: A success message with the updated registration details.

### Admin APIs

#### 1. **POST /admin/signup**
- **Functionality**: Allows the admin to sign up.
- **Request Body**:
  - `phone` (string): Admin's phone number
  - `password` (string): Admin's password
- **Response**: A success or error message indicating the result of the signup.

#### 2. **POST /admin/login**
- **Functionality**: Allows the admin to log in.
  - On successful login, the system generates and updates a JWT token.
- **Request Body**:
  - `phone` (string): Admin's phone number
  - `password` (string): Admin's password
- **Response**: A success message with a token on successful login.

#### 3. **POST /admin/logout**
- **Functionality**: Logs the admin out and deletes the authentication token.
- **Request Body**: None
- **Response**: A success or error message indicating the result of the logout.

#### 4. **GET /admin/registrationsList**
- **Functionality**: Retrieves a list of registered users' vaccination slots based on filters.
- **Request Parameters**:
  - `stateOfDosage` (string): First or second dose status
  - `age` (integer): User's age
  - `pincode` (string): User's pincode
  - `slotDate` (string): The date of the vaccination (format: "dd-mm-yyyy")
- **Response**: A list of user registrations that match the filter criteria.

---

### API Format Details

- **Time Format**: `hh.mmAM-hh.mmPM`
- **Date Format**: `dd-mm-yyyy`

### Example Responses

**Success Response**:
```json
{
  "message": "Registration successful",
  "data": { ... }
}
```

**Error Response**:
```json
{
  "error": "Invalid phone number or password"
}
```

---

This API provides essential functionalities for both users and admins involved in the vaccination process. The user-facing features allow individuals to sign up, log in, check available slots, register for vaccines, and update their registrations, while admins can manage user registrations and view the list of vaccination slots.
