from flask import Flask, render_template, request, redirect, url_for, session
from models.product import Product
from models.order import Order
import os

app = Flask(__name__)
app.config.from_pyfile('config.py')

@app.route('/')
def index():
    featured_products = Product.get_all()[:4]  # Показываем первые 4 продукта как рекомендуемые
    return render_template('index.html', featured_products=featured_products)

@app.route('/products')
def products():
    category = request.args.get('category')
    if category:
        products = Product.get_by_category(category)
    else:
        products = Product.get_all()
    return render_template('products.html', products=products)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    product = Product.get_by_id(product_id)
    if not product:
        return redirect(url_for('products'))
    return render_template('product_detail.html', product=product)

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    product_id = int(request.form['product_id'])
    quantity = int(request.form['quantity'])
    
    if 'cart' not in session:
        session['cart'] = []
    
    # Проверяем, есть ли уже такой товар в корзине
    found = False
    for item in session['cart']:
        if item['product_id'] == product_id:
            item['quantity'] += quantity
            found = True
            break
    
    if not found:
        product = Product.get_by_id(product_id)
        session['cart'].append({
            'product_id': product_id,
            'quantity': quantity,
            'price': product['price'],
            'name': product['name']
        })
    
    session.modified = True
    return redirect(url_for('cart'))

@app.route('/cart')
def cart():
    cart_items = session.get('cart', [])
    total = sum(item['price'] * item['quantity'] for item in cart_items)
    return render_template('cart.html', cart_items=cart_items, total=total)

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        customer_name = request.form['name']
        customer_phone = request.form['phone']
        customer_address = request.form['address']
        
        cart_items = session.get('cart', [])
        total = sum(item['price'] * item['quantity'] for item in cart_items)
        
        # Создаем заказ
        order_id = Order.create(
            customer_name=customer_name,
            customer_phone=customer_phone,
            customer_address=customer_address,
            total_amount=total,
            items=[{
                'product_id': item['product_id'],
                'quantity': item['quantity'],
                'price': item['price']
            } for item in cart_items]
        )
        
        # Очищаем корзину
        session.pop('cart', None)
        
        return render_template('order_success.html', order_id=order_id)
    
    return render_template('checkout.html')

if __name__ == '__main__':
    app.run(debug=True)