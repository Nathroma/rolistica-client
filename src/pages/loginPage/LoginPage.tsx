import useAuth from '@/hooks/useAuth';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginPage.scss';
import { authService } from '@/services/auth/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      navigate('/selection', { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email === null || password === null) {
      setError('Veuillez renseigner un email et un mot de passe');
      setIsSubmitting(false);
      return;
    }

    try {
      await login({
        email: email as string,
        password: password as string,
      });
      navigate('/selection', { replace: true });
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cx('login-page')}>
      <h1 className={cx('login-page__title')}>Connexion</h1>
      <form className={cx('login-page__form')} onSubmit={onSubmit}>
        <div className={cx('login-page__field')}>
          <label className={cx('login-page__label')} htmlFor="email">
            Email
          </label>
          <input
            className={cx('login-page__input')}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            required
          />
        </div>
        <div className={cx('login-page__field')}>
          <label className={cx('login-page__label')} htmlFor="password">
            Mot de passe
          </label>
          <input
            className={cx('login-page__input')}
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            required
          />
        </div>
        {error && <p className={cx('login-page__error')}>{error}</p>}
        <button
          className={cx('login-page__submit')}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Connexion...' : 'Connexion'}
        </button>
      </form>
      <p className={cx('login-page__footer')}>
        Pas encore de compte ? <Link to="/register">Créer un compte</Link>
      </p>
    </div>
  );
};

export default LoginPage;
