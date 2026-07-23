import { useAuth } from '@/context/authUtils';
import { loginUser } from '@/services/auth/authApi';
import cx from 'classnames';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './loginPage.scss';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData) as FormData;

    try {
      const tokens = await loginUser({
        email: formDataObject.email,
        password: formDataObject.password,
      });

      login(tokens);
      const redirectTo =
        (routerLocation.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? '/sheet';
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Erreur lors de la connexion'
      );
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
