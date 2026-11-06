import cx from 'classnames';
import { Link } from 'react-router-dom';
import './welcomePage.scss';

const WelcomePage = () => {
  return (
    <div className={cx('welcome-page')}>
      <h1>Bienvenue sur Rolistica !</h1>
      <p>
        Rolistica est un outil de gestion de personnage. Il permet de gérer les
        personnages, les équipements, les compétences, les sorts, etc.
      </p>
      <p>
        Il est conçu pour être utilisé par les maîtres de jeu et les joueurs.
      </p>
      <p>
        C&apos;est un projet personnel, n&apos;ayant aucune pretention de
        remplacer votre logiciel de gestion de personnage favori. Il est donc
        possible que vous rencontriez des bugs ou des fonctionnalités
        manquantes. Si vous avez des suggestions d&apos;améliorations,
        n&apos;hésitez pas à me faire des retours via sur le discord du projet.
      </p>
      <p>
        Pour commencer, veuillez créer un compte en cliquant sur le bouton
        ci-dessous.
      </p>
      <div className={cx('welcome-page__actions')}>
        <Link to="/register">
          <button>Créer un compte</button>
        </Link>
        <Link to="/login">
          <button>Se connecter</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
