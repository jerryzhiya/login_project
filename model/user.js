
import pool from '../db/pool.js';
import bcrypt from 'bcrypt';

export default class User {
  // Create a new user with hashed password
  static async create(firstname, lastname, email, username, password, isMember = false, isAdmin = false) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, email, username, password, ismember, isadmin)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [firstname, lastname, email, username, hashedPassword, isMember, isAdmin]
    );

    return result.rows[0];
  }

  // Find user by username
  static async findByUsername(username) {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  // Update membership
  static async updateMembership(id, isMember) {
    return pool.query(
      'UPDATE users SET ismember = $1 WHERE id = $2',
      [isMember, id]
    );
  }

  // Update admin
  static async updateAdmin(id, isAdmin) {
    return pool.query(
      'UPDATE users SET isadmin = $1 WHERE id = $2',
      [isAdmin, id]
    );
  }
}