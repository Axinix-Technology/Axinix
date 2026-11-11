import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { validateEmail, validateRequired } from '../../utils/validators';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail('enterprise.admin@axinix.tech');
    setPassword('DemoPass2026!');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    const passErr = validateRequired(password, 'Password');
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back! Successfully signed in.', 'success');
      navigate('/');
    } catch (err) {
      showToast('Authentication failed. Please verify credentials.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto border border-gold/30">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">
            Session Active
          </h2>
          <p className="text-xs text-muted mt-1">
            Signed in as <b className="text-foreground">{user?.email}</b> ({user?.role})
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link to="/customer-account">
            <Button variant="gold" size="md" className="w-full sm:w-auto">
              Open Client Portal
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Go to Home
            </Button>
          </Link>
          <Button variant="ghost" size="md" onClick={logout} className="w-full sm:w-auto text-muted">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="gold" size="sm">Client Portal</Badge>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
          Sign In to Your Workspace
        </h2>
        <p className="text-xs text-muted">
          Access your ERP management console, branch reports, and support tickets.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Enterprise Email"
          name="email"
          type="email"
          required
          placeholder="admin@yourcompany.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null })); }}
          error={errors.email}
          icon={Mail}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          required
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: null })); }}
          error={errors.password}
          icon={Lock}
        />

        <div className="flex items-center justify-between text-xs text-muted pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-border text-gold focus:ring-gold" />
            <span>Remember terminal</span>
          </label>
          <button
            type="button"
            onClick={() => showToast('Password reset link dispatched to authorized administrator email.', 'info')}
            className="text-gold hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full shadow-lg shadow-gold/20"
            isLoading={isLoading}
          >
            <span>Authenticate Session</span>
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="pt-3 border-t border-border/40 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-royal-light hover:text-gold transition-colors font-medium underline"
          >
            Auto-fill Demo Enterprise Credentials
          </button>
        </div>
      </form>

      <div className="text-[11px] text-muted text-center pt-2 flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-gold" />
        <span>TLS 1.3 256-bit Encrypted Handshake</span>
      </div>
    </div>
  );
}

