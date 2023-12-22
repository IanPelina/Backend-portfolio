import './Footer.scss';

export default function Footer() {
    return (
        <footer style={{zIndex: 999}}>
            <ul>
                <li>
                    <a aria-label='git-logo' alt='git' href="https://github.com/"><i className="fab fa-github icon"></i></a>
                </li>
                <li>
                    <a aria-label='linkedin-logo' alt='linkedin' href="https://fr.linkedin.com/"><i className="fab fa-linkedin-in icon"></i></a>
                </li>
                <li>
                    <a aria-label='twitter-logo' alt='twitter' href="https://twitter.com/?lang=fr"><i className="fab fa-twitter icon"></i></a>
                </li>
            </ul>
            <div>
                <p>© Ian LE PAPE, Tous droits réservés.</p>
            </div>
        </footer>
    )
}