from database.db import get_db_connection

class Product:
    @staticmethod
    def get_all():
        conn = get_db_connection()
        products = conn.execute('SELECT * FROM products').fetchall()
        conn.close()
        return products

    @staticmethod
    def get_by_id(product_id):
        conn = get_db_connection()
        product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
        conn.close()
        return product

    @staticmethod
    def get_by_category(category):
        conn = get_db_connection()
        products = conn.execute('SELECT * FROM products WHERE category = ?', (category,)).fetchall()
        conn.close()
        return products