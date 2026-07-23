import { useAuth } from '@/context/authUtils';
import { registerUser } from '@/services/auth/authApi';
import cx from 'classnames';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registerPage.scss';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData) as FormData;

    if (formDataObject.password !== formDataObject.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formDataObject.acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation");
      return;
    }

    setIsSubmitting(true);

    try {
      const tokens = await registerUser({
        email: formDataObject.email,
        password: formDataObject.password,
      });

      login(tokens);
      navigate('/sheet', { replace: true });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Erreur lors de l'inscription"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cx('register-page')}>
      <h1 className={cx('register-page__title')}>Inscription</h1>
      <form className={cx('register-page__form')} onSubmit={onSubmit}>
        <div className={cx('register-page__field')}>
          <label className={cx('register-page__label')} htmlFor="email">
            Email
          </label>
          <input
            className={cx('register-page__input')}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="vous@exemple.com"
            required
          />
        </div>
        <div className={cx('register-page__field')}>
          <label className={cx('register-page__label')} htmlFor="password">
            Mot de passe
          </label>
          <input
            className={cx('register-page__input')}
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Minimum 8 caractères"
            required
          />
        </div>
        <div className={cx('register-page__field')}>
          <label
            className={cx('register-page__label')}
            htmlFor="confirmPassword"
          >
            Confirmation du mot de passe
          </label>
          <input
            className={cx('register-page__input')}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Minimum 8 caractères"
            required
          />
        </div>
        <div className={cx('register-page__checkbox-field')}>
          <input
            className={cx('register-page__checkbox')}
            type="checkbox"
            id="acceptTerms"
            name="acceptTerms"
            required
          />
          <label
            className={cx('register-page__checkbox-label')}
            htmlFor="acceptTerms"
          >
            J&apos;accepte les conditions d&apos;utilisation
          </label>
        </div>
        {error && <p className={cx('register-page__error')}>{error}</p>}
        <button
          className={cx('register-page__submit')}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Inscription...' : 'Inscription'}
        </button>
      </form>
      <p className={cx('register-page__footer')}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
