import db from '../db/pool.js';

export default class Messages {
  static async create({ title, content, authorId }) {
    const query = `
      INSERT INTO messages (title, content, author_id)
      VALUES ($1, $2, $3)
      RETURNING id, title, content, author_id, created_at;
    `;
    return db.query(query, [title, content, authorId]);
  }

  static async findAll() {
    const query = `
      SELECT m.id, m.title, m.content, m.created_at,
             u.username AS author
      FROM messages m
      JOIN users u ON u.id = m.author_id
      ORDER BY m.created_at DESC;
    `;
    return db.query(query);
  }

  static async deleteById(id) {
    return db.query(`DELETE FROM messages WHERE id = $1`, [id]);
  }
}