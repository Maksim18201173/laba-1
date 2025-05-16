from database.db import get_db_connection

class Order:
    @staticmethod
    def create(customer_name, customer_phone, customer_address, total_amount, items):
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Создаем заказ
        cursor.execute('''
        INSERT INTO orders (customer_name, customer_phone, customer_address, total_amount)
        VALUES (?, ?, ?, ?)
        ''', (customer_name, customer_phone, customer_address, total_amount))
        
        order_id = cursor.lastrowid
        
        # Добавляем товары в заказ
        for item in items:
            cursor.execute('''
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES (?, ?, ?, ?)
            ''', (order_id, item['product_id'], item['quantity'], item['price']))
        
        conn.commit()
        conn.close()
        return order_id