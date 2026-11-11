import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Standardized Folder-Based Page Routes
import HomePage from './pages/home/index';
import SolutionsPage from './pages/solutions/index';
import SolutionDetailPage from './pages/solutions/[id]';
import IndustriesPage from './pages/industries/index';
import IndustryDetailPage from './pages/industries/[slug]';
import ServicesPage from './pages/services/index';
import ServiceDetailPage from './pages/services/[id]';
import ProductsPage from './pages/products/index';
import CategoryDetailPage from './pages/category/[slug]';
import CartPage from './pages/cart/index';
import CheckoutPage from './pages/checkout/index';
import CustomerAccountPage from './pages/customer-account/index';
import DeliveryTrackingPage from './pages/delivery/index';
import PortfolioPage from './pages/portfolio/index';
import PortfolioDetailPage from './pages/portfolio/[id]';
import AboutPage from './pages/about/index';
import InsightsPage from './pages/insights/index';
import InsightDetailPage from './pages/insights/[id]';
import DemoCreatePage from './pages/demo/create';
import ContactCreatePage from './pages/contact/create';
import SearchPage from './pages/search/index';
import LoginPage from './pages/login/index';
import NotFoundPage from './pages/not-found/index';

// Help Policies
import FaqPage from './pages/help-policies/faq/index';
import PrivacyPolicyPage from './pages/help-policies/privacy-policy/index';
import TermsPage from './pages/help-policies/terms/index';
import ReturnPolicyPage from './pages/help-policies/return-policy/index';
import ShippingPolicyPage from './pages/help-policies/shipping-policy/index';
import CookiePolicyPage from './pages/help-policies/cookie-policy/index';

export function App() {
  return (
    <Routes>
      {/* Primary Application Shell */}
      <Route element={<MainLayout />}>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Solutions: List & Details */}
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:id" element={<SolutionDetailPage />} />

        {/* Industries: List & Details */}
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:slug" element={<IndustryDetailPage />} />
        <Route path="/industries/:id" element={<IndustryDetailPage />} />

        {/* Services: List & Details */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />

        {/* Products & Categories */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/category/:slug" element={<CategoryDetailPage />} />

        {/* E-Commerce & Checkout (Dedicated Workflows) */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/customer-account" element={<CustomerAccountPage />} />
        <Route path="/delivery" element={<DeliveryTrackingPage />} />

        {/* Portfolio: List & Details */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />

        {/* About */}
        <Route path="/about" element={<AboutPage />} />

        {/* Insights: List & Details */}
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:id" element={<InsightDetailPage />} />

        {/* Demo Booking (Dedicated Create Workflow) */}
        <Route path="/demo" element={<DemoCreatePage />} />
        <Route path="/demo/create" element={<DemoCreatePage />} />

        {/* Contact (Dedicated Create Workflow) */}
        <Route path="/contact" element={<ContactCreatePage />} />
        <Route path="/contact/create" element={<ContactCreatePage />} />

        {/* Search */}
        <Route path="/search" element={<SearchPage />} />

        {/* Help & Policies */}
        <Route path="/legal" element={<PrivacyPolicyPage />} />
        <Route path="/help-policies/contact" element={<ContactCreatePage />} />
        <Route path="/help-policies/contact/create" element={<ContactCreatePage />} />
        <Route path="/help-policies/faq" element={<FaqPage />} />
        <Route path="/help-policies/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/help-policies/terms" element={<TermsPage />} />
        <Route path="/help-policies/return-policy" element={<ReturnPolicyPage />} />
        <Route path="/help-policies/returns" element={<ReturnPolicyPage />} />
        <Route path="/help-policies/shipping" element={<ShippingPolicyPage />} />
        <Route path="/help-policies/shipping-policy" element={<ShippingPolicyPage />} />
        <Route path="/help-policies/cookie-policy" element={<CookiePolicyPage />} />

        {/* 404 Recovery */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Authentication Shell */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
