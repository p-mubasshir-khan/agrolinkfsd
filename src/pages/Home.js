import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, Truck, Shield, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative bg-primary-50 pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8 tracking-tight">
              Fresh from the Farm to <span className="text-primary-600">Your Table</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
              Connect directly with local farmers and get fresh, organic produce delivered to your doorstep. Support local agriculture while eating healthy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8">
                  Join as Farmer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose AgriConnect?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We bridge the gap between farmers and consumers, ensuring fair prices and fresh quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary-600">
              <Leaf className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">100% Organic</h3>
            <p className="text-neutral-600 leading-relaxed">
              Get fresh produce directly from local farmers who use sustainable farming practices.
            </p>
          </Card>

          <Card className="text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary-600">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Direct Connection</h3>
            <p className="text-neutral-600 leading-relaxed">
              Cut out the middlemen. Know exactly where your food comes from and who grew it.
            </p>
          </Card>

          <Card className="text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Fast Delivery</h3>
            <p className="text-neutral-600 leading-relaxed">
              Quick and reliable delivery service ensures your produce arrives fresh and on time.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Simple steps to get fresh food on your table.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Browse', desc: 'Explore fresh produce from local farmers.', step: '01' },
              { title: 'Order', desc: 'Add items to cart and place your order.', step: '02' },
              { title: 'Harvest', desc: 'Farmers harvest your order fresh.', step: '03' },
              { title: 'Enjoy', desc: 'Receive delivery and enjoy fresh food.', step: '04' },
            ].map((item, index) => (
              <div key={index} className="relative p-6 rounded-2xl bg-neutral-800 border border-neutral-700">
                <div className="text-6xl font-bold text-neutral-700 mb-4 opacity-50">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 text-primary-400">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Taste the Difference?
            </h2>
            <p className="text-xl text-primary-100 mb-10">
              Join thousands of happy customers supporting local agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="text-primary-700 font-bold">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;