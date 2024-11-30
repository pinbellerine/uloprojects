// LoginRegister.tsx
import { Component, createSignal, Show, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import "./Login_Register.css";

// Import assets
import user from './Asset/user.svg';
import telepon from './Asset/telepon.svg';
import password from './Asset/password.svg';
import email from './Asset/email.svg';
import showpassword from './Asset/showpassword.svg';
import hidepassword from './Asset/hidePassword.svg';
import google from './Asset/google.svg';
import apple from './Asset/apple.svg';
import facebook from './Asset/facebook.svg';
import poster1 from './Asset/poster1.svg';
import poster2 from './Asset/poster2.svg';
import poster3 from './Asset/poster3.svg';
import poster4 from './Asset/poster4.svg';
import poster5 from './Asset/poster5.svg';
import poster6 from './Asset/poster6.svg';
import poster7 from './Asset/poster7.svg';
import poster8 from './Asset/poster8.svg';
import poster9 from './Asset/poster9.svg';
import poster10 from './Asset/poster10.svg';

// Interface definitions
interface RegisterData {
  username: string;
  email: string;
  password: string;
  nomor_telepon: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
}

interface PopupProps {
  type: 'success' | 'error' | 'validation';
  message: string;
  onClose: () => void;
}

// Popup Component
const Popup: Component<PopupProps> = (props) => {
  createEffect(() => {
    if (props.message) {
      const timer = setTimeout(() => {
        props.onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div class={`popup popup-${props.type}`}>
      <div class="popup-icon">
        {props.type === 'success' && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        )}
        {props.type === 'error' && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        )}
        {props.type === 'validation' && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        )}
      </div>
      <span class="popup-message">{props.message}</span>
      <button class="popup-close" onClick={props.onClose}>×</button>
    </div>
  );
};

// Main LoginRegister Component
const LoginRegister: Component = () => {
  const [isRegister, setIsRegister] = createSignal(false);
  const [showPassword, setShowPassword] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [success, setSuccess] = createSignal<string | null>(null);
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = createSignal<FormData>({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  // Form validation
  const validateForm = () => {
    const { username, email, password, phone } = formData();

    if (isRegister()) {
      if (!username || username.length < 3) {
        setError('Username minimal 3 karakter');
        return false;
      }
      if (!phone || !/^[0-9]{10,12}$/.test(phone)) {
        setError('Nomor telepon harus 10-12 digit');
        return false;
      }
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email tidak valid');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password minimal 6 karakter');
      return false;
    }

    return true;
  };

  // API integration functions
  const registerUser = async (data: RegisterData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Registration failed');
      }

      return responseData;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const loginUser = async (data: LoginData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Login failed');
      }

      return responseData;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isRegister()) {
        const { username, email, password, phone } = formData();
        await registerUser({
          username,
          email,
          password,
          nomor_telepon: phone,
        });
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => {
          setIsRegister(false);
          setFormData({ username: '', email: '', password: '', phone: '' });
        }, 2000);
      } else {
        const { email, password } = formData();
        await loginUser({ email, password });
        setSuccess('Login berhasil!');
        setTimeout(() => {
          navigate("/Beranda-Dekstop");
        }, 1000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers
  const handleForgotPassword = () => {
    navigate('/lupapass');
  };

  // Class for tab container in register mode
  const tabContainerClass = () => `tab-container ${isRegister() ? 'register' : ''}`;

  return (
    <div class="containerkaff">
      {/* Popup Container */}
      <div class="popup-containerkaff">
        <Show when={error()}>
          <Popup
            type="error"
            message={error() || ''}
            onClose={() => setError(null)}
          />
        </Show>
        <Show when={success()}>
          <Popup
            type="success"
            message={success() || ''}
            onClose={() => setSuccess(null)}
          />
        </Show>
      </div>

      {/* Login Section */}
      <div class="login-section">
        <h1 class="logo">ULO.</h1>
        <h2 class="welcome">Selamat Datang!</h2>

        {/* Tab Container */}
        <div class={tabContainerClass()}>
          <button
            class={`tab ${!isRegister() ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(false);
              setError(null);
              setSuccess(null);
            }}
          >
            Login
          </button>
          <button
            class={`tab ${isRegister() ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(true);
              setError(null);
              setSuccess(null);
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form class="form" onSubmit={handleSubmit}>
          <Show when={isRegister()}>
            <div class="input-group">
              <img src={user} alt="user" class="icon" />
              <input
                type="text"
                placeholder="Username"
                value={formData().username}
                onInput={(e) => setFormData({ ...formData(), username: e.currentTarget.value })}
              />
            </div>
          </Show>

          <div class="input-group">
            <img src={email} alt="email" class="icon" />
            <input
              type="email"
              placeholder="Email"
              value={formData().email}
              onInput={(e) => setFormData({ ...formData(), email: e.currentTarget.value })}
            />
          </div>

          <div class="input-group">
            <img src={password} alt="password" class="icon" />
            <input
              type={showPassword() ? 'text' : 'password'}
              placeholder="Password"
              value={formData().password}
              onInput={(e) => setFormData({ ...formData(), password: e.currentTarget.value })}
            />
            <img
              src={showPassword() ? hidepassword : showpassword}
              class="password-toggle"
              onClick={() => setShowPassword(!showPassword())}
              alt="toggle password"
            />
          </div>

          <Show when={isRegister()}>
            <div class="input-group">
              <img src={telepon} alt="phone" class="icon" />
              <input
                type="tel"
                placeholder="Nomor Telepon"
                value={formData().phone}
                onInput={(e) => setFormData({ ...formData(), phone: e.currentTarget.value })}
              />
            </div>
          </Show>
          <Show when={isRegister()}>
            <div class="flex items-start">
              <input
                type="checkbox"
                id="agreement"
                class="mt-1 mr-2"
              // onChange={handleAgreementChange}
              />
              <label for="agreement" class="text-sm text-gray-600">
                Dengan mendaftar, saya menyatakan telah membaca dan menyetujui{" "}
                <a href="#" class="text-blue-600 hover:underline">
                  Ketentuan Layanan
                </a>{" "}
                &{" "}
                <a href="#" class="text-blue-600 hover:underline">
                  Kebijakan Jawa
                </a>
              </label>
            </div>
          </Show>

          <button type="submit" class="submit-button" disabled={loading()}>
            {loading() ? 'Processing...' : isRegister() ? 'Daftar' : 'Lanjutkan'}
          </button>

          <Show when={isRegister()}>
            <p class="login-link">
              Sudah punya akun? <a href="#" onClick={() => setIsRegister(false)}>Login</a>
            </p>
          </Show>

          <Show when={!isRegister()}>
            <a class="forgot-password" onClick={handleForgotPassword}>
              Lupa Password?
            </a>

            <div class="divider">Atau Masuk Dengan</div>

            <div class="social-login">
              <button type="button" class="social-button-transparent">
                <img src={google} alt="google" class="social-icon" />
              </button>
              <button type="button" class="social-button-transparent">
                <img src={apple} alt="apple" class="social-icon" />
              </button>
              <button type="button" class="social-button-transparent">
                <img src={facebook} alt="facebook" class="social-icon" />
              </button>
            </div>
          </Show>
        </form>
      </div>

      {/* Posters Section */}
      <div class="posters-section">
        <div class="poster-column left-column">
          <img src={poster1} alt="Movie Poster" class="poster" />
          <img src={poster10} alt="Movie Poster" class="poster" />
          <img src={poster4} alt="Movie Poster" class="poster" />
          <img src={poster1} alt="Movie Poster" class="poster" />
          <img src={poster10} alt="Movie Poster" class="poster" />
          <img src={poster4} alt="Movie Poster" class="poster" />
        </div>
        <div class="poster-column middle-column">
          <img src={poster2} alt="Movie Poster" class="poster" />
          <img src={poster5} alt="Movie Poster" class="poster" />
          <img src={poster8} alt="Movie Poster" class="poster" />
          <img src={poster2} alt="Movie Poster" class="poster" />
          <img src={poster5} alt="Movie Poster" class="poster" />
          <img src={poster8} alt="Movie Poster" class="poster" />
        </div>
        <div class="poster-column right-column">
          <img src={poster3} alt="Movie Poster" class="poster" />
          <img src={poster6} alt="Movie Poster" class="poster" />
          <img src={poster9} alt="Movie Poster" class="poster" />
          <img src={poster3} alt="Movie Poster" class="poster" />
          <img src={poster6} alt="Movie Poster" class="poster" />
          <img src={poster9} alt="Movie Poster" class="poster" />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;