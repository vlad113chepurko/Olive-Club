import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img className="hover:cursor-pointer" src="/logo.svg" alt="logo" width={214} height={40}/>
      </div>
        <div className="language-circle hover:cursor-pointer">
            <p>
                RU
            </p>
        </div>
    </header>
  )
}