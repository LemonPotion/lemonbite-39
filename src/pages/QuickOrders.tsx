
import React, { useState } from 'react';
import Layout from '../components/Layout';
import QuickOrder from '../components/QuickOrder';

const QuickOrdersPage = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  return (
    <Layout onCartOpen={() => setIsCartOpen(true)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Quick Orders
          </h1>
          <p className="text-muted-foreground">
            Save and manage your favorite combinations for quick reordering
          </p>
        </div>
        <QuickOrder />
      </div>
    </Layout>
  );
};

export default QuickOrdersPage;
