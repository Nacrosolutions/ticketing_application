
import Link from 'next/link'




const Header =({currentUser})=>{


    const links=[
        !currentUser && {labels:'Sign Up',href:'/auth/signup'},
        !currentUser && {labels:'Sign In',href:'/auth/signin'},
        currentUser &&{labels:'Sign Out',href:'/auth/signout'},
        
        
        ].filter(linkConfig=>linkConfig)
        .map(({labels,href})=>{
  return <li key={href} className='nav-item'>
    <Link href={href} className='nav-link'>
    {labels}
    </Link>
  </li>
        })
    return <nav className="navbar navbar-light bg-light">
        <Link href="/" className="navbar-brand">
        GitTix
        </Link>
        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'> 


{links}
            </ul>
        </div>
    </nav>

}


export default Header;